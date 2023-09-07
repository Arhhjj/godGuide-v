
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/util/Behavior3.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'de9bbKKaMZC1qbjY6eFDl/m', 'Behavior3');
// scripts/common/util/Behavior3.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.B3Wait = exports.B3Succeeder = exports.B3Runner = exports.B3Failer = exports.B3Error = exports.B3Repeater = exports.B3RepeatUntilSuccess = exports.B3RepeatUntilFailure = exports.B3MaxTime = exports.B3Limiter = exports.B3Inverter = exports.B3Sequence = exports.B3Priority = exports.B3MemSequence = exports.B3MemPriority = exports.B3Decorator = exports.B3Condition = exports.B3Composite = exports.B3Action = exports.B3BaseNode = exports.B3Blackboard = exports.B3Tick = exports.B3BehaviorTree = exports.B3State = void 0;
/**
 * 节点状态
 */
var B3State;
(function (B3State) {
    B3State[B3State["SUCCESS"] = 1] = "SUCCESS";
    B3State[B3State["FAILURE"] = 2] = "FAILURE";
    B3State[B3State["RUNNING"] = 3] = "RUNNING";
    B3State[B3State["ERROR"] = 4] = "ERROR";
})(B3State = exports.B3State || (exports.B3State = {}));
/**
 * The BehaviorTree class, as the name implies, represents the Behavior Tree
 * structure.
 *
 * There are two ways to construct a Behavior Tree: by manually setting the
 * root node, or by loading it from a data structure (which can be loaded
 * from a JSON). Both methods are shown in the examples below and better
 * explained in the user guide.
 *
 * The tick method must be called periodically, in order to send the tick
 * signal to all nodes in the tree, starting from the root. The method
 * `BehaviorTree.tick` receives a target object and a blackboard as
 * parameters. The target object can be anything: a game agent, a system, a
 * DOM object, etc. This target is not used by any piece of Behavior3JS,
 * i.e., the target object will only be used by custom nodes.
 *
 * The blackboard is obligatory and must be an instance of `Blackboard`. This
 * requirement is necessary due to the fact that neither `BehaviorTree` or
 * any node will store the execution variables in its own object (e.g., the
 * BT does not store the target, information about opened nodes or number of
 * times the tree was called). But because of this, you only need a single
 * tree instance to control multiple (maybe hundreds) objects.
 *
 * Manual construction of a Behavior Tree
 * --------------------------------------
 *
 *     var tree = new b3.BehaviorTree();
 *
 *     tree.root = new b3.Sequence({children:[
 *       new b3.Priority({children:[
 *         new MyCustomNode(),
 *         new MyCustomNode()
 *       ]}),
 *       ...
 *     ]});
 *
 *
 * Loading a Behavior Tree from data structure
 * -------------------------------------------
 *
 *     var tree = new b3.BehaviorTree();
 *
 *     tree.load({
 *       "title"       : "Behavior Tree title"
 *       "description" : "My description"
 *       "root"        : "node-id-1"
 *       "nodes"       : {
 *         "node-id-1" : {
 *           "name"        : "Priority", // this is the node type
 *           "title"       : "Root Node",
 *           "description" : "Description",
 *           "children"    : ["node-id-2", "node-id-3"],
 *         },
 *         ...
 *       }
 *     })
 *
 *
 * @module b3
 * @class BehaviorTree
 */
var B3BehaviorTree = /** @class */ (function () {
    /**
     * Initialization method.
     */
    function B3BehaviorTree() {
        /**
         * The tree id, must be unique. By default, created with `b3.createUUID`.
         * @readOnly
         */
        this.id = null;
        /**
         * The tree title.
         * @readonly
         */
        this.title = null;
        /**
         * Description of the tree.
         * @readonly
         */
        this.description = null;
        /**
         * A dictionary with (key-value) properties. Useful to define custom
         * variables in the visual editor.
         * @readonly
         */
        this.properties = null;
        /**
         * The reference to the root node. Must be an instance of `b3.BaseNode`.
         */
        this.root = null;
        /**
         * The reference to the debug instance.
         */
        this.debug = null;
        this.id = b3.createUUID();
        this.title = "The behavior tree";
        this.description = "Default description";
        this.properties = {};
        this.root = null;
        this.debug = null;
    }
    /**
     * This method loads a Behavior Tree from a data structure, populating this
     * object with the provided data. Notice that, the data structure must
     * follow the format specified by Behavior3JS. Consult the guide to know
     * more about this format.
     *
     * You probably want to use custom nodes in your BTs, thus, you need to
     * provide the `names` object, in which this method can find the nodes by
     * `names[NODE_NAME]`. This variable can be a namespace or a dictionary,
     * as long as this method can find the node by its name, for example:
     *
     *     //json
     *     ...
     *     "node1": {
     *       "name": MyCustomNode,
     *       "title": ...
     *     }
     *     ...
     *
     *     //code
     *     var bt = new b3.BehaviorTree();
     *     bt.load(data, {"MyCustomNode":MyCustomNode})
     *
     *
     * @method load
     * @param data The data structure representing a Behavior Tree.
     * @param names A namespace or dict containing custom nodes.
     */
    B3BehaviorTree.prototype.load = function (data, names) {
        names = names || {};
        this.title = data.title || this.title;
        this.description = data.description || this.description;
        this.properties = data.properties || this.properties;
        var nodes = {};
        var id, spec, node;
        // Create the node list (without connection between them)
        for (id in data.nodes) {
            spec = data.nodes[id];
            var Cls;
            if (spec.name in names) {
                // Look for the name in custom nodes
                Cls = names[spec.name];
            }
            else if (spec.name in b3) {
                // Look for the name in default nodes
                Cls = b3[spec.name];
            }
            else {
                // Invalid node name
                throw new EvalError('BehaviorTree.load: Invalid node name + "' +
                    spec.name + '".');
            }
            node = new Cls(spec.properties);
            node.id = spec.id || node.id;
            node.title = spec.title || node.title;
            node.description = spec.description || node.description;
            node.properties = spec.properties || node.properties;
            nodes[id] = node;
        }
        // Connect the nodes
        for (id in data.nodes) {
            spec = data.nodes[id];
            node = nodes[id];
            if (node.category === b3.COMPOSITE && spec.children) {
                for (var i = 0; i < spec.children.length; i++) {
                    var cid = spec.children[i];
                    node.children.push(nodes[cid]);
                }
            }
            else if (node.category === b3.DECORATOR && spec.child) {
                node.child = nodes[spec.child];
            }
        }
        this.root = nodes[data.root];
    };
    /**
     * This method dump the current BT into a data structure.
     *
     * Note: This method does not record the current node parameters. Thus,
     * it may not be compatible with load for now.
     *
     * @method dump
     * @return {Object} A data object representing this tree.
     */
    B3BehaviorTree.prototype.dump = function () {
        var data = {};
        var customNames = [];
        data.title = this.title;
        data.description = this.description;
        data.root = (this.root) ? this.root.id : null;
        data.properties = this.properties;
        data.nodes = {};
        data.custom_nodes = [];
        if (!this.root)
            return data;
        var stack = [this.root];
        while (stack.length > 0) {
            var node = stack.pop();
            var spec = {};
            spec.id = node.id;
            spec.name = node.name;
            spec.title = node.title;
            spec.description = node.description;
            spec.properties = node.properties;
            spec.parameters = node.parameters;
            // verify custom node
            var proto = (node.constructor && node.constructor.prototype);
            var nodeName = (proto && proto.name) || node.name;
            if (!b3[nodeName] && customNames.indexOf(nodeName) < 0) {
                var subdata = {};
                subdata.name = nodeName;
                subdata.title = (proto && proto.title) || node.title;
                subdata.category = node.category;
                customNames.push(nodeName);
                data.custom_nodes.push(subdata);
            }
            // store children/child
            if (node.category === b3.COMPOSITE && node.children) {
                var children = [];
                for (var i = node.children.length - 1; i >= 0; i--) {
                    children.push(node.children[i].id);
                    stack.push(node.children[i]);
                }
                spec.children = children;
            }
            else if (node.category === b3.DECORATOR && node.child) {
                stack.push(node.child);
                spec.child = node.child.id;
            }
            data.nodes[node.id] = spec;
        }
        return data;
    };
    /**
     * Propagates the tick signal through the tree, starting from the root.
     *
     * This method receives a target object of any type (Object, Array,
     * DOMElement, whatever) and a `Blackboard` instance. The target object has
     * no use at all for all Behavior3JS components, but surely is important
     * for custom nodes. The blackboard instance is used by the tree and nodes
     * to store execution variables (e.g., last node running) and is obligatory
     * to be a `Blackboard` instance (or an object with the same interface).
     *
     * Internally, this method creates a Tick object, which will store the
     * target and the blackboard objects.
     *
     * Note: BehaviorTree stores a list of open nodes from last tick, if these
     * nodes weren"t called after the current tick, this method will close them
     * automatically.
     *
     * @method tick
     * @param target A target object.
     * @param blackboard An instance of blackboard object.
     * @return {Constant} The tick signal state.
     */
    B3BehaviorTree.prototype.tick = function (target, blackboard) {
        if (!blackboard) {
            throw "The blackboard parameter is obligatory and must be an " +
                "instance of b3.Blackboard";
        }
        /* CREATE A TICK OBJECT */
        var tick = new B3Tick();
        tick.debug = this.debug;
        tick.target = target;
        tick.blackboard = blackboard;
        tick.tree = this;
        /* TICK NODE */
        var state = this.root._execute(tick);
        /* CLOSE NODES FROM LAST TICK, IF NEEDED */
        var lastOpenNodes = blackboard.get("openNodes", this.id);
        var currOpenNodes = tick._openNodes.slice(0);
        // does not close if it is still open in this tick
        var start = 0;
        var i;
        for (i = 0; i < Math.min(lastOpenNodes.length, currOpenNodes.length); i++) {
            start = i + 1;
            if (lastOpenNodes[i] !== currOpenNodes[i]) {
                break;
            }
        }
        // close the nodes
        for (i = lastOpenNodes.length - 1; i >= start; i--) {
            lastOpenNodes[i]._close(tick);
        }
        /* POPULATE BLACKBOARD */
        blackboard.set("openNodes", currOpenNodes, this.id);
        blackboard.set("nodeCount", tick._nodeCount, this.id);
        return state;
    };
    return B3BehaviorTree;
}());
exports.B3BehaviorTree = B3BehaviorTree;
/**
 * A new Tick object is instantiated every tick by BehaviorTree. It is passed
 * as parameter to the nodes through the tree during the traversal.
 *
 * The role of the Tick class is to store the instances of tree, debug,
 * target and blackboard. So, all nodes can access these informations.
 *
 * For internal uses, the Tick also is useful to store the open node after
 * the tick signal, in order to let `BehaviorTree` to keep track and close
 * them when necessary.
 *
 * This class also makes a bridge between nodes and the debug, passing the
 * node state to the debug if the last is provided.
 *
 * @module b3
 * @class Tick
 */
var B3Tick = /** @class */ (function () {
    /**
     * Initialization method.
     * @constructor
     */
    function B3Tick() {
        /**
         * The tree reference.
         * @readOnly
         */
        this.tree = null;
        /**
         * The debug reference.
         * @readOnly
         */
        this.debug = null;
        /**
         * The target object reference.
         * @readOnly
         */
        this.target = null;
        /**
         * The blackboard reference.
         * @readOnly
         */
        this.blackboard = null;
        /**
         * The list of open nodes. Update during the tree traversal.
         * @protected
         * @readOnly
         */
        this._openNodes = [];
        /**
         * The number of nodes entered during the tick. Update during the tree
         * traversal.
         *
         * @property {Integer} _nodeCount
         * @protected
         * @readOnly
         */
        this._nodeCount = 0;
        // set by BehaviorTree
        this.tree = null;
        this.debug = null;
        this.target = null;
        this.blackboard = null;
        // updated during the tick signal
        this._openNodes = [];
        this._nodeCount = 0;
    }
    /**
     * Called when entering a node (called by BaseNode).
     * @method _enterNode
     * @param node The node that called this method.
     * @protected
     */
    B3Tick.prototype._enterNode = function (node) {
        this._nodeCount++;
        this._openNodes.push(node);
        // TODO: call debug here
    };
    /**
     * Callback when opening a node (called by BaseNode).
     * @method _openNode
     * @param node The node that called this method.
     * @protected
     */
    B3Tick.prototype._openNode = function (node) {
        // TODO: call debug here
    };
    /**
     * Callback when ticking a node (called by BaseNode).
     * @method _tickNode
     * @param node The node that called this method.
     * @protected
     */
    B3Tick.prototype._tickNode = function (node) {
        // TODO: call debug here
    };
    /**
     * Callback when closing a node (called by BaseNode).
     * @method _closeNode
     * @param node The node that called this method.
     * @protected
     */
    B3Tick.prototype._closeNode = function (node) {
        // TODO: call debug here
        this._openNodes.pop();
    };
    /**
     * Callback when exiting a node (called by BaseNode).
     * @method _exitNode
     * @param node The node that called this method.
     * @protected
     */
    B3Tick.prototype._exitNode = function (node) {
        // TODO: call debug here
    };
    return B3Tick;
}());
exports.B3Tick = B3Tick;
/**
 * The Blackboard is the memory structure required by `BehaviorTree` and its
 * nodes. It only have 2 public methods: `set` and `get`. These methods works
 * in 3 different contexts: global, per tree, and per node per tree.
 *
 * Suppose you have two different trees controlling a single object with a
 * single blackboard, then:
 *
 * - In the global context, all nodes will access the stored information.
 * - In per tree context, only nodes sharing the same tree share the stored
 *   information.
 * - In per node per tree context, the information stored in the blackboard
 *   can only be accessed by the same node that wrote the data.
 *
 * The context is selected indirectly by the parameters provided to these
 * methods, for example:
 *
 *     // getting/setting variable in global context
 *     blackboard.set("testKey", "value");
 *     var value = blackboard.get("testKey");
 *
 *     // getting/setting variable in per tree context
 *     blackboard.set("testKey", "value", tree.id);
 *     var value = blackboard.get("testKey", tree.id);
 *
 *     // getting/setting variable in per node per tree context
 *     blackboard.set("testKey", "value", tree.id, node.id);
 *     var value = blackboard.get("testKey", tree.id, node.id);
 *
 * Note: Internally, the blackboard store these memories in different
 * objects, being the global on `_baseMemory`, the per tree on `_treeMemory`
 * and the per node per tree dynamically create inside the per tree memory
 * (it is accessed via `_treeMemory[id].nodeMemory`). Avoid to use these
 * variables manually, use `get` and `set` instead.
 *
 * @module b3
 * @class Blackboard
 */
var B3Blackboard = /** @class */ (function () {
    /**
     * Initialization method.
     * @method initialize
     * @constructor
     */
    function B3Blackboard() {
        this._baseMemory = null;
        this._treeMemory = null;
        this._baseMemory = {};
        this._treeMemory = {};
    }
    /**
     * Internal method to retrieve the tree context memory. If the memory does
     * not exist, this method creates it.
     *
     * @method _getTreeMemory
     * @param treeScope The id of the tree in scope.
     * @return {Object} The tree memory.
     * @protected
     */
    B3Blackboard.prototype._getTreeMemory = function (treeScope) {
        if (!this._treeMemory[treeScope]) {
            this._treeMemory[treeScope] = {
                "nodeMemory": {},
                "openNodes": [],
                "traversalDepth": 0,
                "traversalCycle": 0,
            };
        }
        return this._treeMemory[treeScope];
    };
    /**
     * Internal method to retrieve the node context memory, given the tree
     * memory. If the memory does not exist, this method creates is.
     *
     * @method _getNodeMemory
     * @param treeMemory the tree memory.
     * @param nodeScope The id of the node in scope.
     * @return {Object} The node memory.
     * @protected
     */
    B3Blackboard.prototype._getNodeMemory = function (treeMemory, nodeScope) {
        var memory = treeMemory.nodeMemory;
        if (!memory[nodeScope]) {
            memory[nodeScope] = {};
        }
        return memory[nodeScope];
    };
    /**
     * Internal method to retrieve the context memory. If treeScope and
     * nodeScope are provided, this method returns the per node per tree
     * memory. If only the treeScope is provided, it returns the per tree
     * memory. If no parameter is provided, it returns the global memory.
     * Notice that, if only nodeScope is provided, this method will still
     * return the global memory.
     *
     * @method _getMemory
     * @param treeScope The id of the tree scope.
     * @param nodeScope The id of the node scope.
     * @return {Object} A memory object.
     * @protected
     */
    B3Blackboard.prototype._getMemory = function (treeScope, nodeScope) {
        var memory = this._baseMemory;
        if (treeScope) {
            memory = this._getTreeMemory(treeScope);
            if (nodeScope) {
                memory = this._getNodeMemory(memory, nodeScope);
            }
        }
        return memory;
    };
    /**
     * Stores a value in the blackboard. If treeScope and nodeScope are
     * provided, this method will save the value into the per node per tree
     * memory. If only the treeScope is provided, it will save the value into
     * the per tree memory. If no parameter is provided, this method will save
     * the value into the global memory. Notice that, if only nodeScope is
     * provided (but treeScope not), this method will still save the value into
     * the global memory.
     *
     * @method set
     * @param key The key to be stored.
     * @param value The value to be stored.
     * @param treeScope The tree id if accessing the tree or node
     *                           memory.
     * @param nodeScope The node id if accessing the node memory.
     */
    B3Blackboard.prototype.set = function (key, value, treeScope, nodeScope) {
        var memory = this._getMemory(treeScope, nodeScope);
        memory[key] = value;
    };
    /**
     * Retrieves a value in the blackboard. If treeScope and nodeScope are
     * provided, this method will retrieve the value from the per node per tree
     * memory. If only the treeScope is provided, it will retrieve the value
     * from the per tree memory. If no parameter is provided, this method will
     * retrieve from the global memory. If only nodeScope is provided (but
     * treeScope not), this method will still try to retrieve from the global
     * memory.
     *
     * @method get
     * @param key The key to be retrieved.
     * @param treeScope The tree id if accessing the tree or node
     *                           memory.
     * @param nodeScope The node id if accessing the node memory.
     * @return {Object} The value stored or undefined.
     */
    B3Blackboard.prototype.get = function (key, treeScope, nodeScope) {
        var memory = this._getMemory(treeScope, nodeScope);
        return memory[key];
    };
    return B3Blackboard;
}());
exports.B3Blackboard = B3Blackboard;
/**
 * The BaseNode class is used as super class to all nodes in BehaviorJS. It
 * comprises all common variables and methods that a node must have to
 * execute.
 *
 * **IMPORTANT:** Do not inherit from this class, use `b3.Composite`,
 * `b3.Decorator`, `b3.Action` or `b3.Condition`, instead.
 *
 * The attributes are specially designed to serialization of the node in a
 * JSON format. In special, the `parameters` attribute can be set into the
 * visual editor (thus, in the JSON file), and it will be used as parameter
 * on the node initialization at `BehaviorTree.load`.
 *
 * BaseNode also provide 5 callback methods, which the node implementations
 * can override. They are `enter`, `open`, `tick`, `close` and `exit`. See
 * their documentation to know more. These callbacks are called inside the
 * `_execute` method, which is called in the tree traversal.
 *
 * @module b3
 * @class BaseNode
 */
var B3BaseNode = /** @class */ (function () {
    /**
     * Initialization method.
     * @constructor
     */
    function B3BaseNode(params) {
        /**
         * Node ID.
         * @readonly
         */
        this.id = null;
        /**
         * Node name. Must be a unique identifier, preferable the same name of the
         * class. You have to set the node name in the prototype.
         * @readonly
         */
        this.name = null;
        /**
         * Node category. Must be `b3.COMPOSITE`, `b3.DECORATOR`, `b3.ACTION` or
         * `b3.CONDITION`. This is defined automatically be inheriting the
         * correspondent class.
         * @readonly
         */
        this.category = null;
        /**
         * Node title.
         * @optional
         * @readonly
         */
        this.title = null;
        /**
         * Node description.
         * @optional
         * @readonly
         */
        this.description = null;
        /**
         * A dictionary (key, value) describing the node parameters. Useful for
         * defining parameter values in the visual editor. Note: this is only
         * useful for nodes when loading trees from JSON files.
         *
         * **Deprecated since 0.2.0. This is too similar to the properties
         * attribute, thus, this attribute is deprecated in favor to
         * `properties`.**
         *
         * @deprecated since 0.2.0.
         * @readonly
         */
        this.parameters = null;
        /**
         * A dictionary (key, value) describing the node properties. Useful for
         * defining custom variables inside the visual editor.
         *
         * @type {Object}
         * @readonly
         */
        this.properties = null;
        this.id = b3.createUUID();
        this.title = this.title || this.name;
        this.description = "";
        this.parameters = {};
        this.properties = {};
    }
    /**
     * This is the main method to propagate the tick signal to this node. This
     * method calls all callbacks: `enter`, `open`, `tick`, `close`, and
     * `exit`. It only opens a node if it is not already open. In the same
     * way, this method only close a node if the node  returned a status
     * different of `b3.RUNNING`.
     *
     * @method _execute
     * @param tick A tick instance.
     * @return {Constant} The tick state.
     * @protected
     */
    B3BaseNode.prototype._execute = function (tick) {
        // ENTER 
        this._enter(tick);
        // OPEN 
        if (!tick.blackboard.get("isOpen", tick.tree.id, this.id)) {
            this._open(tick);
        }
        // TICK 
        var status = this._tick(tick);
        // CLOSE 
        if (status !== b3.RUNNING) {
            this._close(tick);
        }
        // EXIT 
        this._exit(tick);
        return status;
    };
    /**
     * Wrapper for enter method.
     * @method _enter
     * @param tick A tick instance.
     * @protected
     */
    B3BaseNode.prototype._enter = function (tick) {
        tick._enterNode(this);
        this.enter(tick);
    };
    /**
     * Wrapper for open method.
     * @method _open
     * @param tick A tick instance.
     * @protected
     */
    B3BaseNode.prototype._open = function (tick) {
        tick._openNode(this);
        tick.blackboard.set("isOpen", true, tick.tree.id, this.id);
        this.open(tick);
    };
    /**
     * Wrapper for tick method.
     * @method _tick
     * @param tick A tick instance.
     * @return {Constant} A state constant.
     * @protected
     */
    B3BaseNode.prototype._tick = function (tick) {
        tick._tickNode(this);
        return this.tick(tick);
    };
    /**
     * Wrapper for close method.
     * @method _close
     * @param tick A tick instance.
     * @protected
     */
    B3BaseNode.prototype._close = function (tick) {
        tick._closeNode(this);
        tick.blackboard.set("isOpen", false, tick.tree.id, this.id);
        this.close(tick);
    };
    /**
     * Wrapper for exit method.
     * @method _exit
     * @param tick A tick instance.
     * @protected
     */
    B3BaseNode.prototype._exit = function (tick) {
        tick._exitNode(this);
        this.exit(tick);
    };
    /**
     * Enter method, override this to use. It is called every time a node is
     * asked to execute, before the tick itself.
     *
     * @virtual
     * @method enter
     * @param tick A tick instance.
     */
    B3BaseNode.prototype.enter = function (tick) { };
    /**
     * Open method, override this to use. It is called only before the tick
     * callback and only if the not isn"t closed.
     *
     * Note: a node will be closed if it returned `b3.RUNNING` in the tick.
     *
     * @virtual
     * @method open
     * @param tick A tick instance.
     */
    B3BaseNode.prototype.open = function (tick) { };
    /**
     * Tick method, override this to use. This method must contain the real
     * execution of node (perform a task, call children, etc.). It is called
     * every time a node is asked to execute.
     *
     * @virtual
     * @method tick
     * @param tick A tick instance.
     */
    B3BaseNode.prototype.tick = function (tick) { return b3.SUCCESS; };
    /**
     * Close method, override this to use. This method is called after the tick
     * callback, and only if the tick return a state different from
     * `b3.RUNNING`.
     *
     * @virtual
     * @method close
     * @param tick A tick instance.
     */
    B3BaseNode.prototype.close = function (tick) { };
    /**
     * Exit method, override this to use. Called every time in the end of the
     * execution.
     *
     * @virtual
     * @method exit
     * @param tick A tick instance.
     */
    B3BaseNode.prototype.exit = function (tick) { };
    return B3BaseNode;
}());
exports.B3BaseNode = B3BaseNode;
/**
 * Action is the base class for all action nodes. Thus, if you want to create
 * new custom action nodes, you need to inherit from this class. For example,
 * take a look at the Runner action:
 *
 *     var Runner = b3.Class(b3.Action, {
 *       name: "Runner",
 *
 *       tick: function(tick) {
 *         return b3.RUNNING;
 *       }
 *     });
 *
 * @module b3
 * @class Action
 * @extends B3BaseNode
 */
var B3Action = /** @class */ (function (_super) {
    __extends(B3Action, _super);
    /**
     * Initialization method.
     * @constructor
     */
    function B3Action(params) {
        var _this = _super.call(this, params) || this;
        /**
         * Node category. Default to `b3.ACTION`.
         * @readonly
         */
        _this.category = b3.ACTION;
        return _this;
    }
    return B3Action;
}(B3BaseNode));
exports.B3Action = B3Action;
/**
 * Composite is the base class for all composite nodes. Thus, if you want to
 * create new custom composite nodes, you need to inherit from this class.
 *
 * When creating composite nodes, you will need to propagate the tick signal
 * to the children nodes manually. To do that, override the `tick` method and
 * call the `_execute` method on all nodes. For instance, take a look at how
 * the Sequence node inherit this class and how it call its children:
 *
 *     // Inherit from Composite, using the util function Class.
 *     var Sequence = b3.Class(b3.Composite, {
 *
 *       // Remember to set the name of the node.
 *       name: "Sequence",
 *
 *       // Override the tick function
 *       tick: function(tick) {
 *
 *         // Iterates over the children
 *         for (var i=0; i<this.children.length; i++) {
 *
 *           // Propagate the tick
 *           var status = this.children[i]._execute(tick);
 *
 *           if (status !== b3.SUCCESS) {
 *               return status;
 *           }
 *         }
 *
 *         return b3.SUCCESS;
 *       }
 *     });
 *
 * @module b3
 * @class Composite
 * @extends B3BaseNode
 */
var B3Composite = /** @class */ (function (_super) {
    __extends(B3Composite, _super);
    /**
     * Initialization method.
     * @constructor
     */
    function B3Composite(params) {
        var _this = _super.call(this, params) || this;
        /**
         * Node category. Default to `b3.COMPOSITE`.
         * @readonly
         */
        _this.category = b3.COMPOSITE;
        _this.children = (params.children || []).slice(0);
        return _this;
    }
    return B3Composite;
}(B3BaseNode));
exports.B3Composite = B3Composite;
/**
 * Condition is the base class for all condition nodes. Thus, if you want to
 * create new custom condition nodes, you need to inherit from this class.
 *
 * @class Condition
 * @extends B3BaseNode
 */
var B3Condition = /** @class */ (function (_super) {
    __extends(B3Condition, _super);
    /**
     * Initialization method.
     * @constructor
     */
    function B3Condition(params) {
        var _this = _super.call(this, params) || this;
        /**
         * Node category. Default to `b3.CONDITION`.
         * @readonly
         */
        _this.category = b3.CONDITION;
        return _this;
    }
    return B3Condition;
}(B3BaseNode));
exports.B3Condition = B3Condition;
/**
 * Decorator is the base class for all decorator nodes. Thus, if you want to
 * create new custom decorator nodes, you need to inherit from this class.
 *
 * When creating decorator nodes, you will need to propagate the tick signal
 * to the child node manually, just like the composite nodes. To do that,
 * override the `tick` method and call the `_execute` method on the child
 * node. For instance, take a look at how the Inverter node inherit this
 * class and how it call its children:
 *
 *     // Inherit from Decorator, using the util function Class.
 *     var Inverter = b3.Class(b3.Decorator, {
 *       name: "Inverter",
 *
 *       tick: function(tick) {
 *         if (!this.child) {
 *           return b3.ERROR;
 *         }
 *
 *         // Propagate the tick
 *         var status = this.child._execute(tick);
 *
 *         if (status == b3.SUCCESS) {
 *           status = b3.FAILURE;
 *         } else if (status == b3.FAILURE) {
 *           status = b3.SUCCESS;
 *         }
 *
 *         return status;
 *       }
 *     });
 *
 * @module b3
 * @class Decorator
 * @extends B3BaseNode
 */
var B3Decorator = /** @class */ (function (_super) {
    __extends(B3Decorator, _super);
    /**
     * Initialization method.
     * @constructor
     */
    function B3Decorator(params) {
        var _this = _super.call(this, params) || this;
        /**
         * Node category. Default to b3.DECORATOR.
         * @readonly
         */
        _this.category = b3.DECORATOR;
        _this.child = params.child || null;
        return _this;
    }
    return B3Decorator;
}(B3BaseNode));
exports.B3Decorator = B3Decorator;
/**
 * MemPriority is similar to Priority node, but when a child returns a
 * `RUNNING` state, its index is recorded and in the next tick the,
 * MemPriority calls the child recorded directly, without calling previous
 * children again.
 *
 * @module b3
 * @class MemPriority
 * @extends B3Composite
 */
var B3MemPriority = /** @class */ (function (_super) {
    __extends(B3MemPriority, _super);
    function B3MemPriority() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Node name. Default to `MemPriority`.
         * @readonly
         */
        _this.name = "MemPriority";
        return _this;
    }
    /**
     * Open method.
     * @method open
     * @param tick A tick instance.
     */
    B3MemPriority.prototype.open = function (tick) {
        tick.blackboard.set("runningChild", 0, tick.tree.id, this.id);
    };
    /**
     * Tick method.
     * @method tick
     * @param tick A tick instance.
     * @return {Constant} A state constant.
     */
    B3MemPriority.prototype.tick = function (tick) {
        var child = tick.blackboard.get("runningChild", tick.tree.id, this.id);
        for (var i = child; i < this.children.length; i++) {
            var status = this.children[i]._execute(tick);
            if (status !== b3.FAILURE) {
                if (status === b3.RUNNING) {
                    tick.blackboard.set("runningChild", i, tick.tree.id, this.id);
                }
                return status;
            }
        }
        return b3.FAILURE;
    };
    return B3MemPriority;
}(B3Composite));
exports.B3MemPriority = B3MemPriority;
/**
 * MemSequence is similar to Sequence node, but when a child returns a
 * `RUNNING` state, its index is recorded and in the next tick the
 * MemSequence call the child recorded directly, without calling previous
 * children again.
 *
 * @module b3
 * @class MemSequence
 * @extends B3Composite
 */
var B3MemSequence = /** @class */ (function (_super) {
    __extends(B3MemSequence, _super);
    function B3MemSequence() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Node name. Default to `MemSequence`.
         * @readonly
         */
        _this.name = "MemSequence";
        return _this;
    }
    /**
     * Open method.
     * @method open
     * @param tick A tick instance.
     */
    B3MemSequence.prototype.open = function (tick) {
        tick.blackboard.set("runningChild", 0, tick.tree.id, this.id);
    };
    /**
     * Tick method.
     * @method tick
     * @param tick A tick instance.
     * @return {Constant} A state constant.
     */
    B3MemSequence.prototype.tick = function (tick) {
        var child = tick.blackboard.get("runningChild", tick.tree.id, this.id);
        for (var i = child; i < this.children.length; i++) {
            var status = this.children[i]._execute(tick);
            if (status !== b3.SUCCESS) {
                if (status === b3.RUNNING) {
                    tick.blackboard.set("runningChild", i, tick.tree.id, this.id);
                }
                return status;
            }
        }
        return b3.SUCCESS;
    };
    return B3MemSequence;
}(B3Composite));
exports.B3MemSequence = B3MemSequence;
/**
 * Priority ticks its children sequentially until one of them returns
 * `SUCCESS`, `RUNNING` or `ERROR`. If all children return the failure state,
 * the priority also returns `FAILURE`.
 *
 * @module b3
 * @class Priority
 * @extends B3Composite
 */
var B3Priority = /** @class */ (function (_super) {
    __extends(B3Priority, _super);
    function B3Priority() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Node name. Default to `Priority`.
         * @readonly
         */
        _this.name = "Priority";
        return _this;
    }
    /**
     * Tick method.
     * @method tick
     * @param tick A tick instance.
     * @return {Constant} A state constant.
     */
    B3Priority.prototype.tick = function (tick) {
        for (var i = 0; i < this.children.length; i++) {
            var status = this.children[i]._execute(tick);
            if (status !== b3.FAILURE) {
                return status;
            }
        }
        return b3.FAILURE;
    };
    return B3Priority;
}(B3Composite));
exports.B3Priority = B3Priority;
/**
 * The Sequence node ticks its children sequentially until one of them
 * returns `FAILURE`, `RUNNING` or `ERROR`. If all children return the
 * success state, the sequence also returns `SUCCESS`.
 *
 * @module b3
 * @class Sequence
 * @extends B3Composite
 */
var B3Sequence = /** @class */ (function (_super) {
    __extends(B3Sequence, _super);
    function B3Sequence() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Node name. Default to `Sequence`.
         * @readonly
         */
        _this.name = "Sequence";
        return _this;
    }
    /**
     * Tick method.
     * @method tick
     * @param tick A tick instance.
     * @return {Constant} A state constant.
     */
    B3Sequence.prototype.tick = function (tick) {
        for (var i = 0; i < this.children.length; i++) {
            var status = this.children[i]._execute(tick);
            if (status !== b3.SUCCESS) {
                return status;
            }
        }
        return b3.SUCCESS;
    };
    return B3Sequence;
}(B3Composite));
exports.B3Sequence = B3Sequence;
/**
 * The Inverter decorator inverts the result of the child, returning `SUCCESS`
 * for `FAILURE` and `FAILURE` for `SUCCESS`.
 *
 * @module b3
 * @class Inverter
 * @extends B3Decorator
 */
var B3Inverter = /** @class */ (function (_super) {
    __extends(B3Inverter, _super);
    function B3Inverter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Node name. Default to `Inverter`.
         * @readonly
         */
        _this.name = "Inverter";
        return _this;
    }
    /**
     * Tick method.
     * @method tick
     * @param tick A tick instance.
     * @return {Constant} A state constant.
     */
    B3Inverter.prototype.tick = function (tick) {
        if (!this.child) {
            return b3.ERROR;
        }
        var status = this.child._execute(tick);
        if (status == b3.SUCCESS) {
            status = b3.FAILURE;
        }
        else if (status == b3.FAILURE) {
            status = b3.SUCCESS;
        }
        return status;
    };
    return B3Inverter;
}(B3Decorator));
exports.B3Inverter = B3Inverter;
/**
 * This decorator limit the number of times its child can be called. After a
 * certain number of times, the Limiter decorator returns `FAILURE` without
 * executing the child.
 *
 * @module b3
 * @class Limiter
 * @extends B3Decorator
 */
var B3Limiter = /** @class */ (function (_super) {
    __extends(B3Limiter, _super);
    /**
     * Initialization method.
     *
     * Settings parameters:
     *
     * - **maxLoop** (*Integer*) Maximum number of repetitions.
     * - **child** (*BaseNode*) The child node.
     *
     * @method initialize
     * @param params Object with parameters.
     * @constructor
     */
    function B3Limiter(params) {
        var _this = _super.call(this, params) || this;
        /**
         * Node name. Default to `Limiter`.
         * @readonly
         */
        _this.name = "Limiter";
        /**
         * Node title. Default to `Limit X Activations`. Used in Editor.
         * @readonly
         */
        _this.title = "Limit <maxLoop> Activations";
        /**
         * Node parameters.
         * @readonly
         */
        _this.parameters = { "maxLoop": 1 };
        if (!params.maxLoop) {
            throw "maxLoop parameter in Limiter decorator is an obligatory " +
                "parameter";
        }
        _this.maxLoop = params.maxLoop;
        return _this;
    }
    /**
     * Open method.
     * @method open
     * @param tick A tick instance.
     */
    B3Limiter.prototype.open = function (tick) {
        tick.blackboard.set("i", 0, tick.tree.id, this.id);
    };
    /**
     * Tick method.
     * @method tick
     * @param tick A tick instance.
     * @return {Constant} A state constant.
     */
    B3Limiter.prototype.tick = function (tick) {
        if (!this.child) {
            return b3.ERROR;
        }
        var i = tick.blackboard.get("i", tick.tree.id, this.id);
        if (i < this.maxLoop) {
            var status = this.child._execute(tick);
            if (status == b3.SUCCESS || status == b3.FAILURE)
                tick.blackboard.set("i", i + 1, tick.tree.id, this.id);
            return status;
        }
        return b3.FAILURE;
    };
    return B3Limiter;
}(B3Decorator));
exports.B3Limiter = B3Limiter;
/**
 * The MaxTime decorator limits the maximum time the node child can execute.
 * Notice that it does not interrupt the execution itself (i.e., the child
 * must be non-preemptive), it only interrupts the node after a `RUNNING`
 * status.
 *
 * @module b3
 * @class MaxTime
 * @extends B3Decorator
 */
var B3MaxTime = /** @class */ (function (_super) {
    __extends(B3MaxTime, _super);
    /**
     * Initialization method.
     *
     * Settings parameters:
     *
     * - **maxTime** (*Integer*) Maximum time a child can execute.
     * - **child** (*BaseNode*) The child node.
     *
     * @method initialize
     * @param params Object with parameters.
     * @constructor
     */
    function B3MaxTime(params) {
        var _this = _super.call(this, params) || this;
        /**
         * Node name. Default to `MaxTime`.
         * @readonly
         */
        _this.name = "MaxTime";
        /**
         * Node title. Default to `Max XXms`. Used in Editor.
         * @readonly
         */
        _this.title = "Max <maxTime>ms";
        /**
         * Node parameters.
         * @readonly
         */
        _this.parameters = { "maxTime": 0 };
        if (!params.maxTime) {
            throw "maxTime parameter in MaxTime decorator is an obligatory " +
                "parameter";
        }
        _this.maxTime = params.maxTime;
        return _this;
    }
    /**
     * Open method.
     * @method open
     * @param tick A tick instance.
     */
    B3MaxTime.prototype.open = function (tick) {
        var startTime = (new Date()).getTime();
        tick.blackboard.set("startTime", startTime, tick.tree.id, this.id);
    };
    /**
     * Tick method.
     * @method tick
     * @param tick A tick instance.
     * @return {Constant} A state constant.
     */
    B3MaxTime.prototype.tick = function (tick) {
        if (!this.child) {
            return b3.ERROR;
        }
        var currTime = (new Date()).getTime();
        var startTime = tick.blackboard.get("startTime", tick.tree.id, this.id);
        var status = this.child._execute(tick);
        if (currTime - startTime > this.maxTime) {
            return b3.FAILURE;
        }
        return status;
    };
    return B3MaxTime;
}(B3Decorator));
exports.B3MaxTime = B3MaxTime;
/**
 * RepeatUntilFailure is a decorator that repeats the tick signal until the
 * node child returns `FAILURE`, `RUNNING` or `ERROR`. Optionally, a maximum
 * number of repetitions can be defined.
 *
 * @module b3
 * @class RepeatUntilFailure
 * @extends B3Decorator
 */
var B3RepeatUntilFailure = /** @class */ (function (_super) {
    __extends(B3RepeatUntilFailure, _super);
    /**
     * Initialization method.
     *
     * Settings parameters:
     *
     * - **maxLoop** (*Integer*) Maximum number of repetitions. Default to -1
     *                           (infinite).
     * - **child** (*BaseNode*) The child node.
     *
     * @method initialize
     * @param params Object with parameters.
     * @constructor
     */
    function B3RepeatUntilFailure(params) {
        var _this = _super.call(this, params) || this;
        /**
         * Node name. Default to `RepeatUntilFailure`.
         * @readonly
         */
        _this.name = "RepeatUntilFailure";
        /**
         * Node title. Default to `Repeat Until Failure`.
         * @readonly
         */
        _this.title = "Repeat Until Failure";
        /**
         * Node parameters.
         * @readonly
         */
        _this.parameters = { "maxLoop": -1 };
        _this.maxLoop = params.maxLoop || -1;
        return _this;
    }
    /**
     * Open method.
     * @method open
     * @param tick A tick instance.
     */
    B3RepeatUntilFailure.prototype.open = function (tick) {
        tick.blackboard.set("i", 0, tick.tree.id, this.id);
    };
    /**
     * Tick method.
     * @method tick
     * @param tick A tick instance.
     * @return {Constant} A state constant.
     */
    B3RepeatUntilFailure.prototype.tick = function (tick) {
        if (!this.child) {
            return b3.ERROR;
        }
        var i = tick.blackboard.get("i", tick.tree.id, this.id);
        var status = b3.ERROR;
        while (this.maxLoop < 0 || i < this.maxLoop) {
            status = this.child._execute(tick);
            if (status == b3.SUCCESS) {
                i++;
            }
            else {
                break;
            }
        }
        i = tick.blackboard.set("i", i, tick.tree.id, this.id);
        return status;
    };
    return B3RepeatUntilFailure;
}(B3Decorator));
exports.B3RepeatUntilFailure = B3RepeatUntilFailure;
/**
 * RepeatUntilSuccess is a decorator that repeats the tick signal until the
 * node child returns `SUCCESS`, `RUNNING` or `ERROR`. Optionally, a maximum
 * number of repetitions can be defined.
 *
 * @module b3
 * @class RepeatUntilSuccess
 * @extends B3Decorator
 */
var B3RepeatUntilSuccess = /** @class */ (function (_super) {
    __extends(B3RepeatUntilSuccess, _super);
    /**
     * Initialization method.
     *
     * Settings parameters:
     *
     * - **maxLoop** (*Integer*) Maximum number of repetitions. Default to -1
     *                           (infinite).
     * - **child** (*BaseNode*) The child node.
     *
     * @method initialize
     * @param params Object with parameters.
     * @constructor
     */
    function B3RepeatUntilSuccess(params) {
        var _this = _super.call(this, params) || this;
        /**
         * Node name. Default to `RepeatUntilSuccess`.
         * @readonly
         */
        _this.name = "RepeatUntilSuccess";
        /**
         * Node title. Default to `Repeat Until Success`.
         * @readonly
         */
        _this.title = "Repeat Until Success";
        /**
         * Node parameters.
         * @readonly
         */
        _this.parameters = { "maxLoop": -1 };
        _this.maxLoop = params.maxLoop || -1;
        return _this;
    }
    /**
     * Open method.
     * @method open
     * @param tick A tick instance.
     */
    B3RepeatUntilSuccess.prototype.open = function (tick) {
        tick.blackboard.set("i", 0, tick.tree.id, this.id);
    };
    /**
     * Tick method.
     * @method tick
     * @param tick A tick instance.
     * @return {Constant} A state constant.
     */
    B3RepeatUntilSuccess.prototype.tick = function (tick) {
        if (!this.child) {
            return b3.ERROR;
        }
        var i = tick.blackboard.get("i", tick.tree.id, this.id);
        var status = b3.ERROR;
        while (this.maxLoop < 0 || i < this.maxLoop) {
            status = this.child._execute(tick);
            if (status == b3.FAILURE) {
                i++;
            }
            else {
                break;
            }
        }
        i = tick.blackboard.set("i", i, tick.tree.id, this.id);
        return status;
    };
    return B3RepeatUntilSuccess;
}(B3Decorator));
exports.B3RepeatUntilSuccess = B3RepeatUntilSuccess;
/**
 * Repeater is a decorator that repeats the tick signal until the child node
 * return `RUNNING` or `ERROR`. Optionally, a maximum number of repetitions
 * can be defined.
 *
 * @module b3
 * @class Repeater
 * @extends B3Decorator
 */
var B3Repeater = /** @class */ (function (_super) {
    __extends(B3Repeater, _super);
    /**
     * Initialization method.
     *
     * Settings parameters:
     *
     * - **maxLoop** (*Integer*) Maximum number of repetitions. Default to -1
     *                           (infinite).
     * - **child** (*BaseNode*) The child node.
     *
     * @method initialize
     * @param params Object with parameters.
     * @constructor
     */
    function B3Repeater(params) {
        var _this = _super.call(this, params) || this;
        /**
         * Node name. Default to `Repeater`.
         * @readonly
         */
        _this.name = "Repeater";
        /**
         * Node title. Default to `Repeat XXx`. Used in Editor.
         * @readonly
         */
        _this.title = "Repeat <maxLoop>x";
        /**
         * Node parameters.
         * @readonly
         */
        _this.parameters = { "maxLoop": -1 };
        _this.maxLoop = params.maxLoop || -1;
        return _this;
    }
    /**
     * Open method.
     * @method open
     * @param tick A tick instance.
     */
    B3Repeater.prototype.open = function (tick) {
        tick.blackboard.set("i", 0, tick.tree.id, this.id);
    };
    /**
     * Tick method.
     * @method tick
     * @param tick A tick instance.
     */
    B3Repeater.prototype.tick = function (tick) {
        if (!this.child) {
            return b3.ERROR;
        }
        var i = tick.blackboard.get("i", tick.tree.id, this.id);
        var status = b3.SUCCESS;
        while (this.maxLoop < 0 || i < this.maxLoop) {
            status = this.child._execute(tick);
            if (status == b3.SUCCESS || status == b3.FAILURE) {
                i++;
            }
            else {
                break;
            }
        }
        tick.blackboard.set("i", i, tick.tree.id, this.id);
        return status;
    };
    return B3Repeater;
}(B3Decorator));
exports.B3Repeater = B3Repeater;
/**
 * This action node returns `ERROR` always.
 *
 * @module b3
 * @class Error
 * @extends B3Action
 */
var B3Error = /** @class */ (function (_super) {
    __extends(B3Error, _super);
    function B3Error() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Node name. Default to `Error`.
         * @readonly
         */
        _this.name = "Error";
        return _this;
    }
    /**
     * Tick method.
     * @method tick
     * @param tick A tick instance.
     * @return {Constant} Always return `b3.ERROR`.
     */
    B3Error.prototype.tick = function (tick) {
        return b3.ERROR;
    };
    return B3Error;
}(B3Action));
exports.B3Error = B3Error;
/**
 * This action node returns `FAILURE` always.
 *
 * @module b3
 * @class Failer
 * @extends B3Action
 */
var B3Failer = /** @class */ (function (_super) {
    __extends(B3Failer, _super);
    function B3Failer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Node name. Default to `Failer`.
         * @readonly
         */
        _this.name = "Failer";
        return _this;
    }
    /**
     * Tick method.
     * @method tick
     * @param tick A tick instance.
     * @return {Constant} Always return `b3.FAILURE`.
     */
    B3Failer.prototype.tick = function (tick) {
        return b3.FAILURE;
    };
    return B3Failer;
}(B3Action));
exports.B3Failer = B3Failer;
/**
 * This action node returns RUNNING always.
 *
 * @module b3
 * @class Runner
 * @extends B3Action
 */
var B3Runner = /** @class */ (function (_super) {
    __extends(B3Runner, _super);
    function B3Runner() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Node name. Default to `Runner`.
         * @readonly
         */
        _this.name = "Runner";
        return _this;
    }
    /**
     * Tick method.
     * @method tick
     * @param tick A tick instance.
     * @return {Constant} Always return `b3.RUNNING`.
     */
    B3Runner.prototype.tick = function (tick) {
        return b3.RUNNING;
    };
    return B3Runner;
}(B3Action));
exports.B3Runner = B3Runner;
/**
 * This action node returns `SUCCESS` always.
 *
 * @module b3
 * @class Succeeder
 * @extends B3Action
 */
var B3Succeeder = /** @class */ (function (_super) {
    __extends(B3Succeeder, _super);
    function B3Succeeder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Node name. Default to `Succeeder`.
         * @readonly
         */
        _this.name = "Succeeder";
        return _this;
    }
    /**
     * Tick method.
     * @method tick
     * @param tick A tick instance.
     * @return {Constant} Always return `b3.SUCCESS`.
     */
    B3Succeeder.prototype.tick = function (tick) {
        return b3.SUCCESS;
    };
    return B3Succeeder;
}(B3Action));
exports.B3Succeeder = B3Succeeder;
/**
 * Wait a few seconds.
 *
 * @module b3
 * @class Wait
 * @extends B3Action
 */
var B3Wait = /** @class */ (function (_super) {
    __extends(B3Wait, _super);
    /**
     * Initialization method.
     *
     * Settings parameters:
     *
     * - **milliseconds** (*Integer*) Maximum time, in milliseconds, a child
     *                                can execute.
     *
     * @method initialize
     * @param settings Object with parameters.
     * @constructor
     */
    function B3Wait(settings) {
        var _this = this;
        settings = settings || {};
        _this = _super.call(this, settings) || this;
        /**
         * Node name. Default to `Wait`.
         * @readonly
         */
        _this.name = "Wait";
        /**
         * Node title. Default to `Wait XXms`. Used in Editor.
         * @readonly
         */
        _this.title = "Wait <milliseconds>ms";
        /**
         * Node parameters.
         * @readonly
         */
        _this.parameters = { "milliseconds": 0 };
        _this.endTime = settings.milliseconds || 0;
        return _this;
    }
    /**
     * Open method.
     * @method open
     * @param tick A tick instance.
     */
    B3Wait.prototype.open = function (tick) {
        var startTime = (new Date()).getTime();
        tick.blackboard.set("startTime", startTime, tick.tree.id, this.id);
    };
    /**
     * Tick method.
     * @method tick
     * @param tick A tick instance.
     * @return {Constant} A state constant.
     */
    B3Wait.prototype.tick = function (tick) {
        var currTime = (new Date()).getTime();
        var startTime = tick.blackboard.get("startTime", tick.tree.id, this.id);
        if (currTime - startTime > this.endTime) {
            return b3.SUCCESS;
        }
        return b3.RUNNING;
    };
    return B3Wait;
}(B3Action));
exports.B3Wait = B3Wait;
/**
 * 行为树runtime
 * - https://github.com/behavior3/behavior3js
 */
var b3 = /** @class */ (function () {
    function b3() {
    }
    /**
     * This function is used to create unique IDs for trees and nodes.
     *
     * (consult http://www.ietf.org/rfc/rfc4122.txt).
     *
     * @class createUUID
     * @return {String} A unique ID.
     */
    b3.createUUID = function () {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        // bits 12-15 of the time_hi_and_version field to 0010
        s[14] = "4";
        // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = "-";
        var uuid = s.join("");
        return uuid;
    };
    /**
     * Class is a meta-factory function to create classes in JavaScript. It is a
     * shortcut for the CreateJS syntax style. By default, the class created by
     * this function have an initialize function (the constructor). Optionally,
     * you can specify the inheritance by passing another class as parameter.
     *
     * By default, all classes created using this function, may receive only a
     * dictionary parameter as argument. This pattern is commonly used by jQuery
     * and its plugins.
     *
     * Since 0.2.0, Class also receives a `properties` parameter, a dictionary
     * which will be used to fill the new class prototype.
     *
     * Usage
     * -----
     *
     *     // Creating a simple class
     *     var BaseClass = b3.Class();
     *
     *     var ChildClass = b3.Class(BaseClass, {
     *       // constructor
     *       initialize(params) {
     *
     *         // call super initialize
     *         BaseClass.initialize.call(this, params);
     *         ...
     *       }
     *     });
     *
     * @class Class
     * @param {Object} baseClass The super class.
     * @param {Object} properties A dictionary with attributes and methods.
     * @return {Object} A new class.
     */
    b3.Class = function (baseClass, properties) {
        // create a new class
        var cls = function (params) {
            this.initialize(params || {});
        };
        // if base class is provided, inherit
        if (baseClass) {
            cls.prototype = Object.create(baseClass.prototype);
            cls.prototype.constructor = cls;
        }
        // create initialize if does not exist on baseClass
        if (!cls.prototype.initialize) {
            cls.prototype.initialize = function () { };
        }
        // copy properties
        if (properties) {
            for (var key in properties) {
                cls.prototype[key] = properties[key];
            }
        }
        return cls;
    };
    b3.VERSION = "0.2.0";
    // Returning status
    b3.SUCCESS = B3State.SUCCESS;
    b3.FAILURE = B3State.FAILURE;
    b3.RUNNING = B3State.RUNNING;
    b3.ERROR = B3State.ERROR;
    // Node categories
    b3.COMPOSITE = "composite";
    b3.DECORATOR = "decorator";
    b3.ACTION = "action";
    b3.CONDITION = "condition";
    b3.BehaviorTree = B3BehaviorTree;
    b3.Tick = B3Tick;
    b3.Blackboard = B3Blackboard;
    b3.BaseNode = B3BaseNode;
    b3.Action = B3Action;
    b3.Composite = B3Composite;
    b3.Condition = B3Condition;
    b3.Decorator = B3Decorator;
    b3.MemPriority = B3MemPriority;
    b3.MemSequence = B3MemSequence;
    b3.Priority = B3Priority;
    b3.Sequence = B3Sequence;
    b3.Inverter = B3Inverter;
    b3.Limiter = B3Limiter;
    b3.MaxTime = B3MaxTime;
    b3.RepeatUntilFailure = B3RepeatUntilFailure;
    b3.RepeatUntilSuccess = B3RepeatUntilSuccess;
    b3.Repeater = B3Repeater;
    b3.Error = B3Error;
    b3.Failer = B3Failer;
    b3.Runner = B3Runner;
    b3.Succeeder = B3Succeeder;
    b3.Wait = B3Wait;
    return b3;
}());
exports.default = b3;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY29tbW9uXFx1dGlsXFxCZWhhdmlvcjMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztHQUVHO0FBQ0gsSUFBWSxPQUtYO0FBTEQsV0FBWSxPQUFPO0lBQ2YsMkNBQVcsQ0FBQTtJQUNYLDJDQUFXLENBQUE7SUFDWCwyQ0FBVyxDQUFBO0lBQ1gsdUNBQVMsQ0FBQTtBQUNiLENBQUMsRUFMVyxPQUFPLEdBQVAsZUFBTyxLQUFQLGVBQU8sUUFLbEI7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNERHO0FBQ0g7SUFxQ0k7O09BRUc7SUFDSDtRQXRDQTs7O1dBR0c7UUFDSCxPQUFFLEdBQVcsSUFBSSxDQUFDO1FBRWxCOzs7V0FHRztRQUNILFVBQUssR0FBVyxJQUFJLENBQUM7UUFFckI7OztXQUdHO1FBQ0gsZ0JBQVcsR0FBVyxJQUFJLENBQUM7UUFFM0I7Ozs7V0FJRztRQUNILGVBQVUsR0FBd0IsSUFBSSxDQUFDO1FBRXZDOztXQUVHO1FBQ0gsU0FBSSxHQUFlLElBQUksQ0FBQztRQUV4Qjs7V0FFRztRQUNILFVBQUssR0FBUSxJQUFJLENBQUM7UUFNZCxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLG1CQUFtQixDQUFDO1FBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcscUJBQXFCLENBQUM7UUFDekMsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0EyQkc7SUFDSCw2QkFBSSxHQUFKLFVBQUss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YSxDQUFDO0lBQzVCLFdBQVEsR0FBRyxVQUFVLENBQUM7SUFDdEIsV0FBUSxHQUFHLFVBQVUsQ0FBQztJQUN0QixXQUFRLEdBQUcsVUFBVSxDQUFDO0lBQ3RCLFVBQU8sR0FBRyxTQUFTLENBQUM7SUFDcEIsVUFBTyxHQUFHLFNBQVMsQ0FBQztJQUNwQixxQkFBa0IsR0FBRyxvQkFBb0IsQ0FBQztJQUMxQyxxQkFBa0IsR0FBRyxvQkFBb0IsQ0FBQztJQUMxQyxXQUFRLEdBQUcsVUFBVSxDQUFDO0lBQ3RCLFFBQUssR0FBRyxPQUFPLENBQUM7SUFDaEIsU0FBTSxHQUFHLFFBQVEsQ0FBQztJQUNsQixTQUFNLEdBQUcsUUFBUSxDQUFDO0lBQ2xCLFlBQVMsR0FBRyxXQUFXLENBQUM7SUFDeEIsT0FBSSxHQUFHLE1BQU0sQ0FBQztJQXdGekMsU0FBQztDQTdIRCxBQTZIQyxJQUFBO2tCQTdIb0IsRUFBRSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDoioLngrnnirbmgIFcclxuICovXHJcbmV4cG9ydCBlbnVtIEIzU3RhdGUge1xyXG4gICAgU1VDQ0VTUyA9IDEsXHJcbiAgICBGQUlMVVJFID0gMixcclxuICAgIFJVTk5JTkcgPSAzLFxyXG4gICAgRVJST1IgPSA0XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgQmVoYXZpb3JUcmVlIGNsYXNzLCBhcyB0aGUgbmFtZSBpbXBsaWVzLCByZXByZXNlbnRzIHRoZSBCZWhhdmlvciBUcmVlIFxyXG4gKiBzdHJ1Y3R1cmUuXHJcbiAqIFxyXG4gKiBUaGVyZSBhcmUgdHdvIHdheXMgdG8gY29uc3RydWN0IGEgQmVoYXZpb3IgVHJlZTogYnkgbWFudWFsbHkgc2V0dGluZyB0aGUgXHJcbiAqIHJvb3Qgbm9kZSwgb3IgYnkgbG9hZGluZyBpdCBmcm9tIGEgZGF0YSBzdHJ1Y3R1cmUgKHdoaWNoIGNhbiBiZSBsb2FkZWQgXHJcbiAqIGZyb20gYSBKU09OKS4gQm90aCBtZXRob2RzIGFyZSBzaG93biBpbiB0aGUgZXhhbXBsZXMgYmVsb3cgYW5kIGJldHRlciBcclxuICogZXhwbGFpbmVkIGluIHRoZSB1c2VyIGd1aWRlLlxyXG4gKlxyXG4gKiBUaGUgdGljayBtZXRob2QgbXVzdCBiZSBjYWxsZWQgcGVyaW9kaWNhbGx5LCBpbiBvcmRlciB0byBzZW5kIHRoZSB0aWNrIFxyXG4gKiBzaWduYWwgdG8gYWxsIG5vZGVzIGluIHRoZSB0cmVlLCBzdGFydGluZyBmcm9tIHRoZSByb290LiBUaGUgbWV0aG9kIFxyXG4gKiBgQmVoYXZpb3JUcmVlLnRpY2tgIHJlY2VpdmVzIGEgdGFyZ2V0IG9iamVjdCBhbmQgYSBibGFja2JvYXJkIGFzIFxyXG4gKiBwYXJhbWV0ZXJzLiBUaGUgdGFyZ2V0IG9iamVjdCBjYW4gYmUgYW55dGhpbmc6IGEgZ2FtZSBhZ2VudCwgYSBzeXN0ZW0sIGEgXHJcbiAqIERPTSBvYmplY3QsIGV0Yy4gVGhpcyB0YXJnZXQgaXMgbm90IHVzZWQgYnkgYW55IHBpZWNlIG9mIEJlaGF2aW9yM0pTLCBcclxuICogaS5lLiwgdGhlIHRhcmdldCBvYmplY3Qgd2lsbCBvbmx5IGJlIHVzZWQgYnkgY3VzdG9tIG5vZGVzLlxyXG4gKiBcclxuICogVGhlIGJsYWNrYm9hcmQgaXMgb2JsaWdhdG9yeSBhbmQgbXVzdCBiZSBhbiBpbnN0YW5jZSBvZiBgQmxhY2tib2FyZGAuIFRoaXNcclxuICogcmVxdWlyZW1lbnQgaXMgbmVjZXNzYXJ5IGR1ZSB0byB0aGUgZmFjdCB0aGF0IG5laXRoZXIgYEJlaGF2aW9yVHJlZWAgb3IgXHJcbiAqIGFueSBub2RlIHdpbGwgc3RvcmUgdGhlIGV4ZWN1dGlvbiB2YXJpYWJsZXMgaW4gaXRzIG93biBvYmplY3QgKGUuZy4sIHRoZSBcclxuICogQlQgZG9lcyBub3Qgc3RvcmUgdGhlIHRhcmdldCwgaW5mb3JtYXRpb24gYWJvdXQgb3BlbmVkIG5vZGVzIG9yIG51bWJlciBvZiBcclxuICogdGltZXMgdGhlIHRyZWUgd2FzIGNhbGxlZCkuIEJ1dCBiZWNhdXNlIG9mIHRoaXMsIHlvdSBvbmx5IG5lZWQgYSBzaW5nbGUgXHJcbiAqIHRyZWUgaW5zdGFuY2UgdG8gY29udHJvbCBtdWx0aXBsZSAobWF5YmUgaHVuZHJlZHMpIG9iamVjdHMuXHJcbiAqIFxyXG4gKiBNYW51YWwgY29uc3RydWN0aW9uIG9mIGEgQmVoYXZpb3IgVHJlZVxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBcclxuICogICAgIHZhciB0cmVlID0gbmV3IGIzLkJlaGF2aW9yVHJlZSgpO1xyXG4gKiAgXHJcbiAqICAgICB0cmVlLnJvb3QgPSBuZXcgYjMuU2VxdWVuY2Uoe2NoaWxkcmVuOltcclxuICogICAgICAgbmV3IGIzLlByaW9yaXR5KHtjaGlsZHJlbjpbXHJcbiAqICAgICAgICAgbmV3IE15Q3VzdG9tTm9kZSgpLFxyXG4gKiAgICAgICAgIG5ldyBNeUN1c3RvbU5vZGUoKVxyXG4gKiAgICAgICBdfSksXHJcbiAqICAgICAgIC4uLlxyXG4gKiAgICAgXX0pO1xyXG4gKiAgICAgXHJcbiAqIFxyXG4gKiBMb2FkaW5nIGEgQmVoYXZpb3IgVHJlZSBmcm9tIGRhdGEgc3RydWN0dXJlXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogXHJcbiAqICAgICB2YXIgdHJlZSA9IG5ldyBiMy5CZWhhdmlvclRyZWUoKTtcclxuICpcclxuICogICAgIHRyZWUubG9hZCh7XHJcbiAqICAgICAgIFwidGl0bGVcIiAgICAgICA6IFwiQmVoYXZpb3IgVHJlZSB0aXRsZVwiXHJcbiAqICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwiTXkgZGVzY3JpcHRpb25cIlxyXG4gKiAgICAgICBcInJvb3RcIiAgICAgICAgOiBcIm5vZGUtaWQtMVwiXHJcbiAqICAgICAgIFwibm9kZXNcIiAgICAgICA6IHtcclxuICogICAgICAgICBcIm5vZGUtaWQtMVwiIDoge1xyXG4gKiAgICAgICAgICAgXCJuYW1lXCIgICAgICAgIDogXCJQcmlvcml0eVwiLCAvLyB0aGlzIGlzIHRoZSBub2RlIHR5cGVcclxuICogICAgICAgICAgIFwidGl0bGVcIiAgICAgICA6IFwiUm9vdCBOb2RlXCIsIFxyXG4gKiAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJEZXNjcmlwdGlvblwiLCBcclxuICogICAgICAgICAgIFwiY2hpbGRyZW5cIiAgICA6IFtcIm5vZGUtaWQtMlwiLCBcIm5vZGUtaWQtM1wiXSwgXHJcbiAqICAgICAgICAgfSxcclxuICogICAgICAgICAuLi5cclxuICogICAgICAgfVxyXG4gKiAgICAgfSlcclxuICogICAgIFxyXG4gKlxyXG4gKiBAbW9kdWxlIGIzXHJcbiAqIEBjbGFzcyBCZWhhdmlvclRyZWVcclxuICovXHJcbmV4cG9ydCBjbGFzcyBCM0JlaGF2aW9yVHJlZSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgdHJlZSBpZCwgbXVzdCBiZSB1bmlxdWUuIEJ5IGRlZmF1bHQsIGNyZWF0ZWQgd2l0aCBgYjMuY3JlYXRlVVVJRGAuXHJcbiAgICAgKiBAcmVhZE9ubHlcclxuICAgICAqL1xyXG4gICAgaWQ6IHN0cmluZyA9IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgdHJlZSB0aXRsZS5cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICB0aXRsZTogc3RyaW5nID0gbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlc2NyaXB0aW9uIG9mIHRoZSB0cmVlLlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQSBkaWN0aW9uYXJ5IHdpdGggKGtleS12YWx1ZSkgcHJvcGVydGllcy4gVXNlZnVsIHRvIGRlZmluZSBjdXN0b20gXHJcbiAgICAgKiB2YXJpYWJsZXMgaW4gdGhlIHZpc3VhbCBlZGl0b3IuXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgcHJvcGVydGllczogUmVjb3JkPHN0cmluZywgYW55PiA9IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgcmVmZXJlbmNlIHRvIHRoZSByb290IG5vZGUuIE11c3QgYmUgYW4gaW5zdGFuY2Ugb2YgYGIzLkJhc2VOb2RlYC5cclxuICAgICAqL1xyXG4gICAgcm9vdDogQjNCYXNlTm9kZSA9IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgcmVmZXJlbmNlIHRvIHRoZSBkZWJ1ZyBpbnN0YW5jZS5cclxuICAgICAqL1xyXG4gICAgZGVidWc6IGFueSA9IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXphdGlvbiBtZXRob2QuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuaWQgPSBiMy5jcmVhdGVVVUlEKCk7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IFwiVGhlIGJlaGF2aW9yIHRyZWVcIjtcclxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gXCJEZWZhdWx0IGRlc2NyaXB0aW9uXCI7XHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0ge307XHJcbiAgICAgICAgdGhpcy5yb290ID0gbnVsbDtcclxuICAgICAgICB0aGlzLmRlYnVnID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgbWV0aG9kIGxvYWRzIGEgQmVoYXZpb3IgVHJlZSBmcm9tIGEgZGF0YSBzdHJ1Y3R1cmUsIHBvcHVsYXRpbmcgdGhpc1xyXG4gICAgICogb2JqZWN0IHdpdGggdGhlIHByb3ZpZGVkIGRhdGEuIE5vdGljZSB0aGF0LCB0aGUgZGF0YSBzdHJ1Y3R1cmUgbXVzdCBcclxuICAgICAqIGZvbGxvdyB0aGUgZm9ybWF0IHNwZWNpZmllZCBieSBCZWhhdmlvcjNKUy4gQ29uc3VsdCB0aGUgZ3VpZGUgdG8ga25vdyBcclxuICAgICAqIG1vcmUgYWJvdXQgdGhpcyBmb3JtYXQuXHJcbiAgICAgKlxyXG4gICAgICogWW91IHByb2JhYmx5IHdhbnQgdG8gdXNlIGN1c3RvbSBub2RlcyBpbiB5b3VyIEJUcywgdGh1cywgeW91IG5lZWQgdG8gXHJcbiAgICAgKiBwcm92aWRlIHRoZSBgbmFtZXNgIG9iamVjdCwgaW4gd2hpY2ggdGhpcyBtZXRob2QgY2FuIGZpbmQgdGhlIG5vZGVzIGJ5IFxyXG4gICAgICogYG5hbWVzW05PREVfTkFNRV1gLiBUaGlzIHZhcmlhYmxlIGNhbiBiZSBhIG5hbWVzcGFjZSBvciBhIGRpY3Rpb25hcnksIFxyXG4gICAgICogYXMgbG9uZyBhcyB0aGlzIG1ldGhvZCBjYW4gZmluZCB0aGUgbm9kZSBieSBpdHMgbmFtZSwgZm9yIGV4YW1wbGU6XHJcbiAgICAgKlxyXG4gICAgICogICAgIC8vanNvblxyXG4gICAgICogICAgIC4uLlxyXG4gICAgICogICAgIFwibm9kZTFcIjoge1xyXG4gICAgICogICAgICAgXCJuYW1lXCI6IE15Q3VzdG9tTm9kZSxcclxuICAgICAqICAgICAgIFwidGl0bGVcIjogLi4uXHJcbiAgICAgKiAgICAgfVxyXG4gICAgICogICAgIC4uLlxyXG4gICAgICogICAgIFxyXG4gICAgICogICAgIC8vY29kZVxyXG4gICAgICogICAgIHZhciBidCA9IG5ldyBiMy5CZWhhdmlvclRyZWUoKTtcclxuICAgICAqICAgICBidC5sb2FkKGRhdGEsIHtcIk15Q3VzdG9tTm9kZVwiOk15Q3VzdG9tTm9kZX0pXHJcbiAgICAgKiAgICAgXHJcbiAgICAgKiBcclxuICAgICAqIEBtZXRob2QgbG9hZFxyXG4gICAgICogQHBhcmFtIGRhdGEgVGhlIGRhdGEgc3RydWN0dXJlIHJlcHJlc2VudGluZyBhIEJlaGF2aW9yIFRyZWUuXHJcbiAgICAgKiBAcGFyYW0gbmFtZXMgQSBuYW1lc3BhY2Ugb3IgZGljdCBjb250YWluaW5nIGN1c3RvbSBub2Rlcy5cclxuICAgICAqL1xyXG4gICAgbG9hZChkYXRhOiBhbnksIG5hbWVzPzogUmVjb3JkPHN0cmluZywgdHlwZW9mIEIzQmFzZU5vZGU+KSB7XHJcbiAgICAgICAgbmFtZXMgPSBuYW1lcyB8fCB7fTtcclxuXHJcbiAgICAgICAgdGhpcy50aXRsZSA9IGRhdGEudGl0bGUgfHwgdGhpcy50aXRsZTtcclxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGF0YS5kZXNjcmlwdGlvbiB8fCB0aGlzLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IGRhdGEucHJvcGVydGllcyB8fCB0aGlzLnByb3BlcnRpZXM7XHJcblxyXG4gICAgICAgIHZhciBub2RlcyA9IHt9O1xyXG4gICAgICAgIHZhciBpZCwgc3BlYywgbm9kZTtcclxuICAgICAgICAvLyBDcmVhdGUgdGhlIG5vZGUgbGlzdCAod2l0aG91dCBjb25uZWN0aW9uIGJldHdlZW4gdGhlbSlcclxuICAgICAgICBmb3IgKGlkIGluIGRhdGEubm9kZXMpIHtcclxuICAgICAgICAgICAgc3BlYyA9IGRhdGEubm9kZXNbaWRdO1xyXG4gICAgICAgICAgICB2YXIgQ2xzO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNwZWMubmFtZSBpbiBuYW1lcykge1xyXG4gICAgICAgICAgICAgICAgLy8gTG9vayBmb3IgdGhlIG5hbWUgaW4gY3VzdG9tIG5vZGVzXHJcbiAgICAgICAgICAgICAgICBDbHMgPSBuYW1lc1tzcGVjLm5hbWVdO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNwZWMubmFtZSBpbiBiMykge1xyXG4gICAgICAgICAgICAgICAgLy8gTG9vayBmb3IgdGhlIG5hbWUgaW4gZGVmYXVsdCBub2Rlc1xyXG4gICAgICAgICAgICAgICAgQ2xzID0gYjNbc3BlYy5uYW1lXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIEludmFsaWQgbm9kZSBuYW1lXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXZhbEVycm9yKCdCZWhhdmlvclRyZWUubG9hZDogSW52YWxpZCBub2RlIG5hbWUgKyBcIicgK1xyXG4gICAgICAgICAgICAgICAgICAgIHNwZWMubmFtZSArICdcIi4nKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbm9kZSA9IG5ldyBDbHMoc3BlYy5wcm9wZXJ0aWVzKTtcclxuICAgICAgICAgICAgbm9kZS5pZCA9IHNwZWMuaWQgfHwgbm9kZS5pZDtcclxuICAgICAgICAgICAgbm9kZS50aXRsZSA9IHNwZWMudGl0bGUgfHwgbm9kZS50aXRsZTtcclxuICAgICAgICAgICAgbm9kZS5kZXNjcmlwdGlvbiA9IHNwZWMuZGVzY3JpcHRpb24gfHwgbm9kZS5kZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgbm9kZS5wcm9wZXJ0aWVzID0gc3BlYy5wcm9wZXJ0aWVzIHx8IG5vZGUucHJvcGVydGllcztcclxuXHJcbiAgICAgICAgICAgIG5vZGVzW2lkXSA9IG5vZGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDb25uZWN0IHRoZSBub2Rlc1xyXG4gICAgICAgIGZvciAoaWQgaW4gZGF0YS5ub2Rlcykge1xyXG4gICAgICAgICAgICBzcGVjID0gZGF0YS5ub2Rlc1tpZF07XHJcbiAgICAgICAgICAgIG5vZGUgPSBub2Rlc1tpZF07XHJcblxyXG4gICAgICAgICAgICBpZiAobm9kZS5jYXRlZ29yeSA9PT0gYjMuQ09NUE9TSVRFICYmIHNwZWMuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3BlYy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjaWQgPSBzcGVjLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuY2hpbGRyZW4ucHVzaChub2Rlc1tjaWRdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlLmNhdGVnb3J5ID09PSBiMy5ERUNPUkFUT1IgJiYgc3BlYy5jaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5jaGlsZCA9IG5vZGVzW3NwZWMuY2hpbGRdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJvb3QgPSBub2Rlc1tkYXRhLnJvb3RdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBtZXRob2QgZHVtcCB0aGUgY3VycmVudCBCVCBpbnRvIGEgZGF0YSBzdHJ1Y3R1cmUuXHJcbiAgICAgKlxyXG4gICAgICogTm90ZTogVGhpcyBtZXRob2QgZG9lcyBub3QgcmVjb3JkIHRoZSBjdXJyZW50IG5vZGUgcGFyYW1ldGVycy4gVGh1cywgXHJcbiAgICAgKiBpdCBtYXkgbm90IGJlIGNvbXBhdGlibGUgd2l0aCBsb2FkIGZvciBub3cuXHJcbiAgICAgKiBcclxuICAgICAqIEBtZXRob2QgZHVtcFxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBBIGRhdGEgb2JqZWN0IHJlcHJlc2VudGluZyB0aGlzIHRyZWUuXHJcbiAgICAgKi9cclxuICAgIGR1bXAoKTogYW55IHtcclxuICAgICAgICB2YXIgZGF0YTogYW55ID0ge307XHJcbiAgICAgICAgdmFyIGN1c3RvbU5hbWVzID0gW107XHJcblxyXG4gICAgICAgIGRhdGEudGl0bGUgPSB0aGlzLnRpdGxlO1xyXG4gICAgICAgIGRhdGEuZGVzY3JpcHRpb24gPSB0aGlzLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgIGRhdGEucm9vdCA9ICh0aGlzLnJvb3QpID8gdGhpcy5yb290LmlkIDogbnVsbDtcclxuICAgICAgICBkYXRhLnByb3BlcnRpZXMgPSB0aGlzLnByb3BlcnRpZXM7XHJcbiAgICAgICAgZGF0YS5ub2RlcyA9IHt9O1xyXG4gICAgICAgIGRhdGEuY3VzdG9tX25vZGVzID0gW107XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5yb290KSByZXR1cm4gZGF0YTtcclxuXHJcbiAgICAgICAgdmFyIHN0YWNrID0gW3RoaXMucm9vdF07XHJcbiAgICAgICAgd2hpbGUgKHN0YWNrLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSBzdGFjay5wb3AoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBzcGVjOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgc3BlYy5pZCA9IG5vZGUuaWQ7XHJcbiAgICAgICAgICAgIHNwZWMubmFtZSA9IG5vZGUubmFtZTtcclxuICAgICAgICAgICAgc3BlYy50aXRsZSA9IG5vZGUudGl0bGU7XHJcbiAgICAgICAgICAgIHNwZWMuZGVzY3JpcHRpb24gPSBub2RlLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICBzcGVjLnByb3BlcnRpZXMgPSBub2RlLnByb3BlcnRpZXM7XHJcbiAgICAgICAgICAgIHNwZWMucGFyYW1ldGVycyA9IG5vZGUucGFyYW1ldGVycztcclxuXHJcbiAgICAgICAgICAgIC8vIHZlcmlmeSBjdXN0b20gbm9kZVxyXG4gICAgICAgICAgICB2YXIgcHJvdG8gPSAobm9kZS5jb25zdHJ1Y3RvciAmJiBub2RlLmNvbnN0cnVjdG9yLnByb3RvdHlwZSk7XHJcbiAgICAgICAgICAgIHZhciBub2RlTmFtZSA9IChwcm90byAmJiBwcm90by5uYW1lKSB8fCBub2RlLm5hbWU7XHJcbiAgICAgICAgICAgIGlmICghYjNbbm9kZU5hbWVdICYmIGN1c3RvbU5hbWVzLmluZGV4T2Yobm9kZU5hbWUpIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN1YmRhdGE6IGFueSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgc3ViZGF0YS5uYW1lID0gbm9kZU5hbWU7XHJcbiAgICAgICAgICAgICAgICBzdWJkYXRhLnRpdGxlID0gKHByb3RvICYmIHByb3RvLnRpdGxlKSB8fCBub2RlLnRpdGxlO1xyXG4gICAgICAgICAgICAgICAgc3ViZGF0YS5jYXRlZ29yeSA9IG5vZGUuY2F0ZWdvcnk7XHJcblxyXG4gICAgICAgICAgICAgICAgY3VzdG9tTmFtZXMucHVzaChub2RlTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBkYXRhLmN1c3RvbV9ub2Rlcy5wdXNoKHN1YmRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBzdG9yZSBjaGlsZHJlbi9jaGlsZFxyXG4gICAgICAgICAgICBpZiAobm9kZS5jYXRlZ29yeSA9PT0gYjMuQ09NUE9TSVRFICYmIG5vZGUuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgIHZhciBjaGlsZHJlbiA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IG5vZGUuY2hpbGRyZW4ubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbi5wdXNoKG5vZGUuY2hpbGRyZW5baV0uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnB1c2gobm9kZS5jaGlsZHJlbltpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzcGVjLmNoaWxkcmVuID0gY2hpbGRyZW47XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZS5jYXRlZ29yeSA9PT0gYjMuREVDT1JBVE9SICYmIG5vZGUuY2hpbGQpIHtcclxuICAgICAgICAgICAgICAgIHN0YWNrLnB1c2gobm9kZS5jaGlsZCk7XHJcbiAgICAgICAgICAgICAgICBzcGVjLmNoaWxkID0gbm9kZS5jaGlsZC5pZDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZGF0YS5ub2Rlc1tub2RlLmlkXSA9IHNwZWM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb3BhZ2F0ZXMgdGhlIHRpY2sgc2lnbmFsIHRocm91Z2ggdGhlIHRyZWUsIHN0YXJ0aW5nIGZyb20gdGhlIHJvb3QuXHJcbiAgICAgKiBcclxuICAgICAqIFRoaXMgbWV0aG9kIHJlY2VpdmVzIGEgdGFyZ2V0IG9iamVjdCBvZiBhbnkgdHlwZSAoT2JqZWN0LCBBcnJheSwgXHJcbiAgICAgKiBET01FbGVtZW50LCB3aGF0ZXZlcikgYW5kIGEgYEJsYWNrYm9hcmRgIGluc3RhbmNlLiBUaGUgdGFyZ2V0IG9iamVjdCBoYXNcclxuICAgICAqIG5vIHVzZSBhdCBhbGwgZm9yIGFsbCBCZWhhdmlvcjNKUyBjb21wb25lbnRzLCBidXQgc3VyZWx5IGlzIGltcG9ydGFudCBcclxuICAgICAqIGZvciBjdXN0b20gbm9kZXMuIFRoZSBibGFja2JvYXJkIGluc3RhbmNlIGlzIHVzZWQgYnkgdGhlIHRyZWUgYW5kIG5vZGVzIFxyXG4gICAgICogdG8gc3RvcmUgZXhlY3V0aW9uIHZhcmlhYmxlcyAoZS5nLiwgbGFzdCBub2RlIHJ1bm5pbmcpIGFuZCBpcyBvYmxpZ2F0b3J5XHJcbiAgICAgKiB0byBiZSBhIGBCbGFja2JvYXJkYCBpbnN0YW5jZSAob3IgYW4gb2JqZWN0IHdpdGggdGhlIHNhbWUgaW50ZXJmYWNlKS5cclxuICAgICAqIFxyXG4gICAgICogSW50ZXJuYWxseSwgdGhpcyBtZXRob2QgY3JlYXRlcyBhIFRpY2sgb2JqZWN0LCB3aGljaCB3aWxsIHN0b3JlIHRoZSBcclxuICAgICAqIHRhcmdldCBhbmQgdGhlIGJsYWNrYm9hcmQgb2JqZWN0cy5cclxuICAgICAqIFxyXG4gICAgICogTm90ZTogQmVoYXZpb3JUcmVlIHN0b3JlcyBhIGxpc3Qgb2Ygb3BlbiBub2RlcyBmcm9tIGxhc3QgdGljaywgaWYgdGhlc2UgXHJcbiAgICAgKiBub2RlcyB3ZXJlblwidCBjYWxsZWQgYWZ0ZXIgdGhlIGN1cnJlbnQgdGljaywgdGhpcyBtZXRob2Qgd2lsbCBjbG9zZSB0aGVtXHJcbiAgICAgKiBhdXRvbWF0aWNhbGx5LlxyXG4gICAgICogXHJcbiAgICAgKiBAbWV0aG9kIHRpY2tcclxuICAgICAqIEBwYXJhbSB0YXJnZXQgQSB0YXJnZXQgb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIGJsYWNrYm9hcmQgQW4gaW5zdGFuY2Ugb2YgYmxhY2tib2FyZCBvYmplY3QuXHJcbiAgICAgKiBAcmV0dXJuIHtDb25zdGFudH0gVGhlIHRpY2sgc2lnbmFsIHN0YXRlLlxyXG4gICAgICovXHJcbiAgICB0aWNrKHRhcmdldDogYW55LCBibGFja2JvYXJkOiBCM0JsYWNrYm9hcmQpOiBCM1N0YXRlIHtcclxuICAgICAgICBpZiAoIWJsYWNrYm9hcmQpIHtcclxuICAgICAgICAgICAgdGhyb3cgXCJUaGUgYmxhY2tib2FyZCBwYXJhbWV0ZXIgaXMgb2JsaWdhdG9yeSBhbmQgbXVzdCBiZSBhbiBcIiArXHJcbiAgICAgICAgICAgIFwiaW5zdGFuY2Ugb2YgYjMuQmxhY2tib2FyZFwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogQ1JFQVRFIEEgVElDSyBPQkpFQ1QgKi9cclxuICAgICAgICB2YXIgdGljayA9IG5ldyBCM1RpY2soKTtcclxuICAgICAgICB0aWNrLmRlYnVnID0gdGhpcy5kZWJ1ZztcclxuICAgICAgICB0aWNrLnRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICB0aWNrLmJsYWNrYm9hcmQgPSBibGFja2JvYXJkO1xyXG4gICAgICAgIHRpY2sudHJlZSA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8qIFRJQ0sgTk9ERSAqL1xyXG4gICAgICAgIHZhciBzdGF0ZSA9IHRoaXMucm9vdC5fZXhlY3V0ZSh0aWNrKTtcclxuXHJcbiAgICAgICAgLyogQ0xPU0UgTk9ERVMgRlJPTSBMQVNUIFRJQ0ssIElGIE5FRURFRCAqL1xyXG4gICAgICAgIHZhciBsYXN0T3Blbk5vZGVzID0gYmxhY2tib2FyZC5nZXQoXCJvcGVuTm9kZXNcIiwgdGhpcy5pZCk7XHJcbiAgICAgICAgdmFyIGN1cnJPcGVuTm9kZXMgPSB0aWNrLl9vcGVuTm9kZXMuc2xpY2UoMCk7XHJcblxyXG4gICAgICAgIC8vIGRvZXMgbm90IGNsb3NlIGlmIGl0IGlzIHN0aWxsIG9wZW4gaW4gdGhpcyB0aWNrXHJcbiAgICAgICAgdmFyIHN0YXJ0ID0gMDtcclxuICAgICAgICB2YXIgaTtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgTWF0aC5taW4obGFzdE9wZW5Ob2Rlcy5sZW5ndGgsIGN1cnJPcGVuTm9kZXMubGVuZ3RoKTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHN0YXJ0ID0gaSArIDE7XHJcbiAgICAgICAgICAgIGlmIChsYXN0T3Blbk5vZGVzW2ldICE9PSBjdXJyT3Blbk5vZGVzW2ldKSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY2xvc2UgdGhlIG5vZGVzXHJcbiAgICAgICAgZm9yIChpID0gbGFzdE9wZW5Ob2Rlcy5sZW5ndGggLSAxOyBpID49IHN0YXJ0OyBpLS0pIHtcclxuICAgICAgICAgICAgbGFzdE9wZW5Ob2Rlc1tpXS5fY2xvc2UodGljayk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiBQT1BVTEFURSBCTEFDS0JPQVJEICovXHJcbiAgICAgICAgYmxhY2tib2FyZC5zZXQoXCJvcGVuTm9kZXNcIiwgY3Vyck9wZW5Ob2RlcywgdGhpcy5pZCk7XHJcbiAgICAgICAgYmxhY2tib2FyZC5zZXQoXCJub2RlQ291bnRcIiwgdGljay5fbm9kZUNvdW50LCB0aGlzLmlkKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogQSBuZXcgVGljayBvYmplY3QgaXMgaW5zdGFudGlhdGVkIGV2ZXJ5IHRpY2sgYnkgQmVoYXZpb3JUcmVlLiBJdCBpcyBwYXNzZWRcclxuICogYXMgcGFyYW1ldGVyIHRvIHRoZSBub2RlcyB0aHJvdWdoIHRoZSB0cmVlIGR1cmluZyB0aGUgdHJhdmVyc2FsLlxyXG4gKiBcclxuICogVGhlIHJvbGUgb2YgdGhlIFRpY2sgY2xhc3MgaXMgdG8gc3RvcmUgdGhlIGluc3RhbmNlcyBvZiB0cmVlLCBkZWJ1ZywgXHJcbiAqIHRhcmdldCBhbmQgYmxhY2tib2FyZC4gU28sIGFsbCBub2RlcyBjYW4gYWNjZXNzIHRoZXNlIGluZm9ybWF0aW9ucy5cclxuICogXHJcbiAqIEZvciBpbnRlcm5hbCB1c2VzLCB0aGUgVGljayBhbHNvIGlzIHVzZWZ1bCB0byBzdG9yZSB0aGUgb3BlbiBub2RlIGFmdGVyIFxyXG4gKiB0aGUgdGljayBzaWduYWwsIGluIG9yZGVyIHRvIGxldCBgQmVoYXZpb3JUcmVlYCB0byBrZWVwIHRyYWNrIGFuZCBjbG9zZSBcclxuICogdGhlbSB3aGVuIG5lY2Vzc2FyeS5cclxuICpcclxuICogVGhpcyBjbGFzcyBhbHNvIG1ha2VzIGEgYnJpZGdlIGJldHdlZW4gbm9kZXMgYW5kIHRoZSBkZWJ1ZywgcGFzc2luZyB0aGUgXHJcbiAqIG5vZGUgc3RhdGUgdG8gdGhlIGRlYnVnIGlmIHRoZSBsYXN0IGlzIHByb3ZpZGVkLlxyXG4gKlxyXG4gKiBAbW9kdWxlIGIzXHJcbiAqIEBjbGFzcyBUaWNrXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQjNUaWNrIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSB0cmVlIHJlZmVyZW5jZS5cclxuICAgICAqIEByZWFkT25seVxyXG4gICAgICovXHJcbiAgICB0cmVlOiBCM0JlaGF2aW9yVHJlZSA9IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZGVidWcgcmVmZXJlbmNlLlxyXG4gICAgICogQHJlYWRPbmx5XHJcbiAgICAgKi9cclxuICAgIGRlYnVnOiBhbnkgPSBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHRhcmdldCBvYmplY3QgcmVmZXJlbmNlLlxyXG4gICAgICogQHJlYWRPbmx5XHJcbiAgICAgKi9cclxuICAgIHRhcmdldDogYW55ID0gbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBibGFja2JvYXJkIHJlZmVyZW5jZS5cclxuICAgICAqIEByZWFkT25seVxyXG4gICAgICovXHJcbiAgICBibGFja2JvYXJkOiBCM0JsYWNrYm9hcmQgPSBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGxpc3Qgb2Ygb3BlbiBub2Rlcy4gVXBkYXRlIGR1cmluZyB0aGUgdHJlZSB0cmF2ZXJzYWwuXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcmVhZE9ubHlcclxuICAgICAqL1xyXG4gICAgX29wZW5Ob2RlczogYW55W10gPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBudW1iZXIgb2Ygbm9kZXMgZW50ZXJlZCBkdXJpbmcgdGhlIHRpY2suIFVwZGF0ZSBkdXJpbmcgdGhlIHRyZWUgXHJcbiAgICAgKiB0cmF2ZXJzYWwuXHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSB7SW50ZWdlcn0gX25vZGVDb3VudFxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHJlYWRPbmx5XHJcbiAgICAgKi9cclxuICAgIF9ub2RlQ291bnQ6IG51bWJlciA9IDA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXphdGlvbiBtZXRob2QuXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgLy8gc2V0IGJ5IEJlaGF2aW9yVHJlZVxyXG4gICAgICAgIHRoaXMudHJlZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5kZWJ1ZyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy50YXJnZXQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuYmxhY2tib2FyZCA9IG51bGw7XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZWQgZHVyaW5nIHRoZSB0aWNrIHNpZ25hbFxyXG4gICAgICAgIHRoaXMuX29wZW5Ob2RlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX25vZGVDb3VudCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgd2hlbiBlbnRlcmluZyBhIG5vZGUgKGNhbGxlZCBieSBCYXNlTm9kZSkuXHJcbiAgICAgKiBAbWV0aG9kIF9lbnRlck5vZGVcclxuICAgICAqIEBwYXJhbSBub2RlIFRoZSBub2RlIHRoYXQgY2FsbGVkIHRoaXMgbWV0aG9kLlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICovXHJcbiAgICBfZW50ZXJOb2RlKG5vZGU6IEIzQmFzZU5vZGUpIHtcclxuICAgICAgICB0aGlzLl9ub2RlQ291bnQrKztcclxuICAgICAgICB0aGlzLl9vcGVuTm9kZXMucHVzaChub2RlKTtcclxuXHJcbiAgICAgICAgLy8gVE9ETzogY2FsbCBkZWJ1ZyBoZXJlXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsYmFjayB3aGVuIG9wZW5pbmcgYSBub2RlIChjYWxsZWQgYnkgQmFzZU5vZGUpLlxyXG4gICAgICogQG1ldGhvZCBfb3Blbk5vZGVcclxuICAgICAqIEBwYXJhbSBub2RlIFRoZSBub2RlIHRoYXQgY2FsbGVkIHRoaXMgbWV0aG9kLlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICovXHJcbiAgICBfb3Blbk5vZGUobm9kZTogQjNCYXNlTm9kZSkge1xyXG4gICAgICAgIC8vIFRPRE86IGNhbGwgZGVidWcgaGVyZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGJhY2sgd2hlbiB0aWNraW5nIGEgbm9kZSAoY2FsbGVkIGJ5IEJhc2VOb2RlKS5cclxuICAgICAqIEBtZXRob2QgX3RpY2tOb2RlXHJcbiAgICAgKiBAcGFyYW0gbm9kZSBUaGUgbm9kZSB0aGF0IGNhbGxlZCB0aGlzIG1ldGhvZC5cclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqL1xyXG4gICAgX3RpY2tOb2RlKG5vZGU6IEIzQmFzZU5vZGUpIHtcclxuICAgICAgICAvLyBUT0RPOiBjYWxsIGRlYnVnIGhlcmVcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxiYWNrIHdoZW4gY2xvc2luZyBhIG5vZGUgKGNhbGxlZCBieSBCYXNlTm9kZSkuXHJcbiAgICAgKiBAbWV0aG9kIF9jbG9zZU5vZGVcclxuICAgICAqIEBwYXJhbSBub2RlIFRoZSBub2RlIHRoYXQgY2FsbGVkIHRoaXMgbWV0aG9kLlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICovXHJcbiAgICBfY2xvc2VOb2RlKG5vZGU6IEIzQmFzZU5vZGUpIHtcclxuICAgICAgICAvLyBUT0RPOiBjYWxsIGRlYnVnIGhlcmVcclxuICAgICAgICB0aGlzLl9vcGVuTm9kZXMucG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsYmFjayB3aGVuIGV4aXRpbmcgYSBub2RlIChjYWxsZWQgYnkgQmFzZU5vZGUpLlxyXG4gICAgICogQG1ldGhvZCBfZXhpdE5vZGVcclxuICAgICAqIEBwYXJhbSBub2RlIFRoZSBub2RlIHRoYXQgY2FsbGVkIHRoaXMgbWV0aG9kLlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICovXHJcbiAgICBfZXhpdE5vZGUobm9kZTogQjNCYXNlTm9kZSkge1xyXG4gICAgICAgIC8vIFRPRE86IGNhbGwgZGVidWcgaGVyZVxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogVGhlIEJsYWNrYm9hcmQgaXMgdGhlIG1lbW9yeSBzdHJ1Y3R1cmUgcmVxdWlyZWQgYnkgYEJlaGF2aW9yVHJlZWAgYW5kIGl0cyBcclxuICogbm9kZXMuIEl0IG9ubHkgaGF2ZSAyIHB1YmxpYyBtZXRob2RzOiBgc2V0YCBhbmQgYGdldGAuIFRoZXNlIG1ldGhvZHMgd29ya3NcclxuICogaW4gMyBkaWZmZXJlbnQgY29udGV4dHM6IGdsb2JhbCwgcGVyIHRyZWUsIGFuZCBwZXIgbm9kZSBwZXIgdHJlZS5cclxuICogXHJcbiAqIFN1cHBvc2UgeW91IGhhdmUgdHdvIGRpZmZlcmVudCB0cmVlcyBjb250cm9sbGluZyBhIHNpbmdsZSBvYmplY3Qgd2l0aCBhIFxyXG4gKiBzaW5nbGUgYmxhY2tib2FyZCwgdGhlbjpcclxuICpcclxuICogLSBJbiB0aGUgZ2xvYmFsIGNvbnRleHQsIGFsbCBub2RlcyB3aWxsIGFjY2VzcyB0aGUgc3RvcmVkIGluZm9ybWF0aW9uLiBcclxuICogLSBJbiBwZXIgdHJlZSBjb250ZXh0LCBvbmx5IG5vZGVzIHNoYXJpbmcgdGhlIHNhbWUgdHJlZSBzaGFyZSB0aGUgc3RvcmVkIFxyXG4gKiAgIGluZm9ybWF0aW9uLlxyXG4gKiAtIEluIHBlciBub2RlIHBlciB0cmVlIGNvbnRleHQsIHRoZSBpbmZvcm1hdGlvbiBzdG9yZWQgaW4gdGhlIGJsYWNrYm9hcmQgXHJcbiAqICAgY2FuIG9ubHkgYmUgYWNjZXNzZWQgYnkgdGhlIHNhbWUgbm9kZSB0aGF0IHdyb3RlIHRoZSBkYXRhLlxyXG4gKiAgIFxyXG4gKiBUaGUgY29udGV4dCBpcyBzZWxlY3RlZCBpbmRpcmVjdGx5IGJ5IHRoZSBwYXJhbWV0ZXJzIHByb3ZpZGVkIHRvIHRoZXNlIFxyXG4gKiBtZXRob2RzLCBmb3IgZXhhbXBsZTpcclxuICogXHJcbiAqICAgICAvLyBnZXR0aW5nL3NldHRpbmcgdmFyaWFibGUgaW4gZ2xvYmFsIGNvbnRleHRcclxuICogICAgIGJsYWNrYm9hcmQuc2V0KFwidGVzdEtleVwiLCBcInZhbHVlXCIpO1xyXG4gKiAgICAgdmFyIHZhbHVlID0gYmxhY2tib2FyZC5nZXQoXCJ0ZXN0S2V5XCIpO1xyXG4gKiAgICAgXHJcbiAqICAgICAvLyBnZXR0aW5nL3NldHRpbmcgdmFyaWFibGUgaW4gcGVyIHRyZWUgY29udGV4dFxyXG4gKiAgICAgYmxhY2tib2FyZC5zZXQoXCJ0ZXN0S2V5XCIsIFwidmFsdWVcIiwgdHJlZS5pZCk7XHJcbiAqICAgICB2YXIgdmFsdWUgPSBibGFja2JvYXJkLmdldChcInRlc3RLZXlcIiwgdHJlZS5pZCk7XHJcbiAqICAgICBcclxuICogICAgIC8vIGdldHRpbmcvc2V0dGluZyB2YXJpYWJsZSBpbiBwZXIgbm9kZSBwZXIgdHJlZSBjb250ZXh0XHJcbiAqICAgICBibGFja2JvYXJkLnNldChcInRlc3RLZXlcIiwgXCJ2YWx1ZVwiLCB0cmVlLmlkLCBub2RlLmlkKTtcclxuICogICAgIHZhciB2YWx1ZSA9IGJsYWNrYm9hcmQuZ2V0KFwidGVzdEtleVwiLCB0cmVlLmlkLCBub2RlLmlkKTtcclxuICogXHJcbiAqIE5vdGU6IEludGVybmFsbHksIHRoZSBibGFja2JvYXJkIHN0b3JlIHRoZXNlIG1lbW9yaWVzIGluIGRpZmZlcmVudCBcclxuICogb2JqZWN0cywgYmVpbmcgdGhlIGdsb2JhbCBvbiBgX2Jhc2VNZW1vcnlgLCB0aGUgcGVyIHRyZWUgb24gYF90cmVlTWVtb3J5YCBcclxuICogYW5kIHRoZSBwZXIgbm9kZSBwZXIgdHJlZSBkeW5hbWljYWxseSBjcmVhdGUgaW5zaWRlIHRoZSBwZXIgdHJlZSBtZW1vcnkgXHJcbiAqIChpdCBpcyBhY2Nlc3NlZCB2aWEgYF90cmVlTWVtb3J5W2lkXS5ub2RlTWVtb3J5YCkuIEF2b2lkIHRvIHVzZSB0aGVzZSBcclxuICogdmFyaWFibGVzIG1hbnVhbGx5LCB1c2UgYGdldGAgYW5kIGBzZXRgIGluc3RlYWQuXHJcbiAqICBcclxuICogQG1vZHVsZSBiM1xyXG4gKiBAY2xhc3MgQmxhY2tib2FyZFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEIzQmxhY2tib2FyZCB7XHJcblxyXG4gICAgcHJpdmF0ZSBfYmFzZU1lbW9yeTogUmVjb3JkPHN0cmluZywgYW55PiA9IG51bGw7XHJcbiAgICBwcml2YXRlIF90cmVlTWVtb3J5OiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0gbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemF0aW9uIG1ldGhvZC5cclxuICAgICAqIEBtZXRob2QgaW5pdGlhbGl6ZVxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX2Jhc2VNZW1vcnkgPSB7fTtcclxuICAgICAgICB0aGlzLl90cmVlTWVtb3J5ID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnRlcm5hbCBtZXRob2QgdG8gcmV0cmlldmUgdGhlIHRyZWUgY29udGV4dCBtZW1vcnkuIElmIHRoZSBtZW1vcnkgZG9lc1xyXG4gICAgICogbm90IGV4aXN0LCB0aGlzIG1ldGhvZCBjcmVhdGVzIGl0LlxyXG4gICAgICpcclxuICAgICAqIEBtZXRob2QgX2dldFRyZWVNZW1vcnlcclxuICAgICAqIEBwYXJhbSB0cmVlU2NvcGUgVGhlIGlkIG9mIHRoZSB0cmVlIGluIHNjb3BlLlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgdHJlZSBtZW1vcnkuXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKi9cclxuICAgIF9nZXRUcmVlTWVtb3J5KHRyZWVTY29wZTogc3RyaW5nKTogYW55IHtcclxuICAgICAgICBpZiAoIXRoaXMuX3RyZWVNZW1vcnlbdHJlZVNjb3BlXSkge1xyXG4gICAgICAgICAgICB0aGlzLl90cmVlTWVtb3J5W3RyZWVTY29wZV0gPSB7XHJcbiAgICAgICAgICAgICAgICBcIm5vZGVNZW1vcnlcIjoge30sXHJcbiAgICAgICAgICAgICAgICBcIm9wZW5Ob2Rlc1wiOiBbXSxcclxuICAgICAgICAgICAgICAgIFwidHJhdmVyc2FsRGVwdGhcIjogMCxcclxuICAgICAgICAgICAgICAgIFwidHJhdmVyc2FsQ3ljbGVcIjogMCxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RyZWVNZW1vcnlbdHJlZVNjb3BlXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEludGVybmFsIG1ldGhvZCB0byByZXRyaWV2ZSB0aGUgbm9kZSBjb250ZXh0IG1lbW9yeSwgZ2l2ZW4gdGhlIHRyZWUgXHJcbiAgICAgKiBtZW1vcnkuIElmIHRoZSBtZW1vcnkgZG9lcyBub3QgZXhpc3QsIHRoaXMgbWV0aG9kIGNyZWF0ZXMgaXMuXHJcbiAgICAgKlxyXG4gICAgICogQG1ldGhvZCBfZ2V0Tm9kZU1lbW9yeVxyXG4gICAgICogQHBhcmFtIHRyZWVNZW1vcnkgdGhlIHRyZWUgbWVtb3J5LlxyXG4gICAgICogQHBhcmFtIG5vZGVTY29wZSBUaGUgaWQgb2YgdGhlIG5vZGUgaW4gc2NvcGUuXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBub2RlIG1lbW9yeS5cclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqL1xyXG4gICAgX2dldE5vZGVNZW1vcnkodHJlZU1lbW9yeTogYW55LCBub2RlU2NvcGU6IHN0cmluZyk6IGFueSB7XHJcbiAgICAgICAgdmFyIG1lbW9yeSA9IHRyZWVNZW1vcnkubm9kZU1lbW9yeTtcclxuICAgICAgICBpZiAoIW1lbW9yeVtub2RlU2NvcGVdKSB7XHJcbiAgICAgICAgICAgIG1lbW9yeVtub2RlU2NvcGVdID0ge307XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWVtb3J5W25vZGVTY29wZV07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnRlcm5hbCBtZXRob2QgdG8gcmV0cmlldmUgdGhlIGNvbnRleHQgbWVtb3J5LiBJZiB0cmVlU2NvcGUgYW5kIFxyXG4gICAgICogbm9kZVNjb3BlIGFyZSBwcm92aWRlZCwgdGhpcyBtZXRob2QgcmV0dXJucyB0aGUgcGVyIG5vZGUgcGVyIHRyZWUgXHJcbiAgICAgKiBtZW1vcnkuIElmIG9ubHkgdGhlIHRyZWVTY29wZSBpcyBwcm92aWRlZCwgaXQgcmV0dXJucyB0aGUgcGVyIHRyZWUgXHJcbiAgICAgKiBtZW1vcnkuIElmIG5vIHBhcmFtZXRlciBpcyBwcm92aWRlZCwgaXQgcmV0dXJucyB0aGUgZ2xvYmFsIG1lbW9yeS4gXHJcbiAgICAgKiBOb3RpY2UgdGhhdCwgaWYgb25seSBub2RlU2NvcGUgaXMgcHJvdmlkZWQsIHRoaXMgbWV0aG9kIHdpbGwgc3RpbGwgXHJcbiAgICAgKiByZXR1cm4gdGhlIGdsb2JhbCBtZW1vcnkuXHJcbiAgICAgKlxyXG4gICAgICogQG1ldGhvZCBfZ2V0TWVtb3J5XHJcbiAgICAgKiBAcGFyYW0gdHJlZVNjb3BlIFRoZSBpZCBvZiB0aGUgdHJlZSBzY29wZS5cclxuICAgICAqIEBwYXJhbSBub2RlU2NvcGUgVGhlIGlkIG9mIHRoZSBub2RlIHNjb3BlLlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBBIG1lbW9yeSBvYmplY3QuXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKi9cclxuICAgIF9nZXRNZW1vcnkodHJlZVNjb3BlPzogc3RyaW5nLCBub2RlU2NvcGU/OiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgIHZhciBtZW1vcnkgPSB0aGlzLl9iYXNlTWVtb3J5O1xyXG5cclxuICAgICAgICBpZiAodHJlZVNjb3BlKSB7XHJcbiAgICAgICAgICAgIG1lbW9yeSA9IHRoaXMuX2dldFRyZWVNZW1vcnkodHJlZVNjb3BlKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChub2RlU2NvcGUpIHtcclxuICAgICAgICAgICAgICAgIG1lbW9yeSA9IHRoaXMuX2dldE5vZGVNZW1vcnkobWVtb3J5LCBub2RlU2NvcGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWVtb3J5O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RvcmVzIGEgdmFsdWUgaW4gdGhlIGJsYWNrYm9hcmQuIElmIHRyZWVTY29wZSBhbmQgbm9kZVNjb3BlIGFyZSBcclxuICAgICAqIHByb3ZpZGVkLCB0aGlzIG1ldGhvZCB3aWxsIHNhdmUgdGhlIHZhbHVlIGludG8gdGhlIHBlciBub2RlIHBlciB0cmVlIFxyXG4gICAgICogbWVtb3J5LiBJZiBvbmx5IHRoZSB0cmVlU2NvcGUgaXMgcHJvdmlkZWQsIGl0IHdpbGwgc2F2ZSB0aGUgdmFsdWUgaW50byBcclxuICAgICAqIHRoZSBwZXIgdHJlZSBtZW1vcnkuIElmIG5vIHBhcmFtZXRlciBpcyBwcm92aWRlZCwgdGhpcyBtZXRob2Qgd2lsbCBzYXZlIFxyXG4gICAgICogdGhlIHZhbHVlIGludG8gdGhlIGdsb2JhbCBtZW1vcnkuIE5vdGljZSB0aGF0LCBpZiBvbmx5IG5vZGVTY29wZSBpcyBcclxuICAgICAqIHByb3ZpZGVkIChidXQgdHJlZVNjb3BlIG5vdCksIHRoaXMgbWV0aG9kIHdpbGwgc3RpbGwgc2F2ZSB0aGUgdmFsdWUgaW50b1xyXG4gICAgICogdGhlIGdsb2JhbCBtZW1vcnkuXHJcbiAgICAgKlxyXG4gICAgICogQG1ldGhvZCBzZXRcclxuICAgICAqIEBwYXJhbSBrZXkgVGhlIGtleSB0byBiZSBzdG9yZWQuXHJcbiAgICAgKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIGJlIHN0b3JlZC5cclxuICAgICAqIEBwYXJhbSB0cmVlU2NvcGUgVGhlIHRyZWUgaWQgaWYgYWNjZXNzaW5nIHRoZSB0cmVlIG9yIG5vZGUgXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbW9yeS5cclxuICAgICAqIEBwYXJhbSBub2RlU2NvcGUgVGhlIG5vZGUgaWQgaWYgYWNjZXNzaW5nIHRoZSBub2RlIG1lbW9yeS5cclxuICAgICAqL1xyXG4gICAgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogYW55LCB0cmVlU2NvcGU/OiBzdHJpbmcsIG5vZGVTY29wZT86IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHZhciBtZW1vcnkgPSB0aGlzLl9nZXRNZW1vcnkodHJlZVNjb3BlLCBub2RlU2NvcGUpO1xyXG4gICAgICAgIG1lbW9yeVtrZXldID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMgYSB2YWx1ZSBpbiB0aGUgYmxhY2tib2FyZC4gSWYgdHJlZVNjb3BlIGFuZCBub2RlU2NvcGUgYXJlXHJcbiAgICAgKiBwcm92aWRlZCwgdGhpcyBtZXRob2Qgd2lsbCByZXRyaWV2ZSB0aGUgdmFsdWUgZnJvbSB0aGUgcGVyIG5vZGUgcGVyIHRyZWVcclxuICAgICAqIG1lbW9yeS4gSWYgb25seSB0aGUgdHJlZVNjb3BlIGlzIHByb3ZpZGVkLCBpdCB3aWxsIHJldHJpZXZlIHRoZSB2YWx1ZVxyXG4gICAgICogZnJvbSB0aGUgcGVyIHRyZWUgbWVtb3J5LiBJZiBubyBwYXJhbWV0ZXIgaXMgcHJvdmlkZWQsIHRoaXMgbWV0aG9kIHdpbGxcclxuICAgICAqIHJldHJpZXZlIGZyb20gdGhlIGdsb2JhbCBtZW1vcnkuIElmIG9ubHkgbm9kZVNjb3BlIGlzIHByb3ZpZGVkIChidXRcclxuICAgICAqIHRyZWVTY29wZSBub3QpLCB0aGlzIG1ldGhvZCB3aWxsIHN0aWxsIHRyeSB0byByZXRyaWV2ZSBmcm9tIHRoZSBnbG9iYWxcclxuICAgICAqIG1lbW9yeS5cclxuICAgICAqXHJcbiAgICAgKiBAbWV0aG9kIGdldFxyXG4gICAgICogQHBhcmFtIGtleSBUaGUga2V5IHRvIGJlIHJldHJpZXZlZC5cclxuICAgICAqIEBwYXJhbSB0cmVlU2NvcGUgVGhlIHRyZWUgaWQgaWYgYWNjZXNzaW5nIHRoZSB0cmVlIG9yIG5vZGUgXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbW9yeS5cclxuICAgICAqIEBwYXJhbSBub2RlU2NvcGUgVGhlIG5vZGUgaWQgaWYgYWNjZXNzaW5nIHRoZSBub2RlIG1lbW9yeS5cclxuICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIHZhbHVlIHN0b3JlZCBvciB1bmRlZmluZWQuXHJcbiAgICAgKi9cclxuICAgIGdldChrZXk6IHN0cmluZywgdHJlZVNjb3BlPzogc3RyaW5nLCBub2RlU2NvcGU/OiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgIHZhciBtZW1vcnkgPSB0aGlzLl9nZXRNZW1vcnkodHJlZVNjb3BlLCBub2RlU2NvcGUpO1xyXG4gICAgICAgIHJldHVybiBtZW1vcnlba2V5XTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFRoZSBCYXNlTm9kZSBjbGFzcyBpcyB1c2VkIGFzIHN1cGVyIGNsYXNzIHRvIGFsbCBub2RlcyBpbiBCZWhhdmlvckpTLiBJdCBcclxuICogY29tcHJpc2VzIGFsbCBjb21tb24gdmFyaWFibGVzIGFuZCBtZXRob2RzIHRoYXQgYSBub2RlIG11c3QgaGF2ZSB0byBcclxuICogZXhlY3V0ZS5cclxuICpcclxuICogKipJTVBPUlRBTlQ6KiogRG8gbm90IGluaGVyaXQgZnJvbSB0aGlzIGNsYXNzLCB1c2UgYGIzLkNvbXBvc2l0ZWAsIFxyXG4gKiBgYjMuRGVjb3JhdG9yYCwgYGIzLkFjdGlvbmAgb3IgYGIzLkNvbmRpdGlvbmAsIGluc3RlYWQuXHJcbiAqXHJcbiAqIFRoZSBhdHRyaWJ1dGVzIGFyZSBzcGVjaWFsbHkgZGVzaWduZWQgdG8gc2VyaWFsaXphdGlvbiBvZiB0aGUgbm9kZSBpbiBhIFxyXG4gKiBKU09OIGZvcm1hdC4gSW4gc3BlY2lhbCwgdGhlIGBwYXJhbWV0ZXJzYCBhdHRyaWJ1dGUgY2FuIGJlIHNldCBpbnRvIHRoZSBcclxuICogdmlzdWFsIGVkaXRvciAodGh1cywgaW4gdGhlIEpTT04gZmlsZSksIGFuZCBpdCB3aWxsIGJlIHVzZWQgYXMgcGFyYW1ldGVyIFxyXG4gKiBvbiB0aGUgbm9kZSBpbml0aWFsaXphdGlvbiBhdCBgQmVoYXZpb3JUcmVlLmxvYWRgLlxyXG4gKiBcclxuICogQmFzZU5vZGUgYWxzbyBwcm92aWRlIDUgY2FsbGJhY2sgbWV0aG9kcywgd2hpY2ggdGhlIG5vZGUgaW1wbGVtZW50YXRpb25zIFxyXG4gKiBjYW4gb3ZlcnJpZGUuIFRoZXkgYXJlIGBlbnRlcmAsIGBvcGVuYCwgYHRpY2tgLCBgY2xvc2VgIGFuZCBgZXhpdGAuIFNlZSBcclxuICogdGhlaXIgZG9jdW1lbnRhdGlvbiB0byBrbm93IG1vcmUuIFRoZXNlIGNhbGxiYWNrcyBhcmUgY2FsbGVkIGluc2lkZSB0aGUgXHJcbiAqIGBfZXhlY3V0ZWAgbWV0aG9kLCB3aGljaCBpcyBjYWxsZWQgaW4gdGhlIHRyZWUgdHJhdmVyc2FsLlxyXG4gKiBcclxuICogQG1vZHVsZSBiM1xyXG4gKiBAY2xhc3MgQmFzZU5vZGVcclxuICovXHJcbmV4cG9ydCBjbGFzcyBCM0Jhc2VOb2RlIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE5vZGUgSUQuXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgaWQ6IHN0cmluZyA9IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOb2RlIG5hbWUuIE11c3QgYmUgYSB1bmlxdWUgaWRlbnRpZmllciwgcHJlZmVyYWJsZSB0aGUgc2FtZSBuYW1lIG9mIHRoZSBcclxuICAgICAqIGNsYXNzLiBZb3UgaGF2ZSB0byBzZXQgdGhlIG5vZGUgbmFtZSBpbiB0aGUgcHJvdG90eXBlLlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIG5hbWU6IHN0cmluZyA9IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOb2RlIGNhdGVnb3J5LiBNdXN0IGJlIGBiMy5DT01QT1NJVEVgLCBgYjMuREVDT1JBVE9SYCwgYGIzLkFDVElPTmAgb3IgXHJcbiAgICAgKiBgYjMuQ09ORElUSU9OYC4gVGhpcyBpcyBkZWZpbmVkIGF1dG9tYXRpY2FsbHkgYmUgaW5oZXJpdGluZyB0aGUgXHJcbiAgICAgKiBjb3JyZXNwb25kZW50IGNsYXNzLlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIGNhdGVnb3J5OiBzdHJpbmcgPSBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTm9kZSB0aXRsZS5cclxuICAgICAqIEBvcHRpb25hbFxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIHRpdGxlOiBzdHJpbmcgPSBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTm9kZSBkZXNjcmlwdGlvbi5cclxuICAgICAqIEBvcHRpb25hbFxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQSBkaWN0aW9uYXJ5IChrZXksIHZhbHVlKSBkZXNjcmliaW5nIHRoZSBub2RlIHBhcmFtZXRlcnMuIFVzZWZ1bCBmb3IgXHJcbiAgICAgKiBkZWZpbmluZyBwYXJhbWV0ZXIgdmFsdWVzIGluIHRoZSB2aXN1YWwgZWRpdG9yLiBOb3RlOiB0aGlzIGlzIG9ubHkgXHJcbiAgICAgKiB1c2VmdWwgZm9yIG5vZGVzIHdoZW4gbG9hZGluZyB0cmVlcyBmcm9tIEpTT04gZmlsZXMuXHJcbiAgICAgKlxyXG4gICAgICogKipEZXByZWNhdGVkIHNpbmNlIDAuMi4wLiBUaGlzIGlzIHRvbyBzaW1pbGFyIHRvIHRoZSBwcm9wZXJ0aWVzIFxyXG4gICAgICogYXR0cmlidXRlLCB0aHVzLCB0aGlzIGF0dHJpYnV0ZSBpcyBkZXByZWNhdGVkIGluIGZhdm9yIHRvIFxyXG4gICAgICogYHByb3BlcnRpZXNgLioqXHJcbiAgICAgKlxyXG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgMC4yLjAuXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgcGFyYW1ldGVyczogYW55ID0gbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEEgZGljdGlvbmFyeSAoa2V5LCB2YWx1ZSkgZGVzY3JpYmluZyB0aGUgbm9kZSBwcm9wZXJ0aWVzLiBVc2VmdWwgZm9yIFxyXG4gICAgICogZGVmaW5pbmcgY3VzdG9tIHZhcmlhYmxlcyBpbnNpZGUgdGhlIHZpc3VhbCBlZGl0b3IuXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBwcm9wZXJ0aWVzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0gbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWtkOiKgueCue+8jOS7heeUqOS6jkRFQ09SQVRPUlxyXG4gICAgICovXHJcbiAgICBjaGlsZDogYW55O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5a2Q6IqC54K577yM5LuF55So5LqOQ09NUE9TSVRFXHJcbiAgICAgKi9cclxuICAgIGNoaWxkcmVuOiBhbnlbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemF0aW9uIG1ldGhvZC5cclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihwYXJhbXM6IGFueSkge1xyXG4gICAgICAgIHRoaXMuaWQgPSBiMy5jcmVhdGVVVUlEKCk7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRoaXMudGl0bGUgfHwgdGhpcy5uYW1lO1xyXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBcIlwiO1xyXG4gICAgICAgIHRoaXMucGFyYW1ldGVycyA9IHt9O1xyXG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBpcyB0aGUgbWFpbiBtZXRob2QgdG8gcHJvcGFnYXRlIHRoZSB0aWNrIHNpZ25hbCB0byB0aGlzIG5vZGUuIFRoaXMgXHJcbiAgICAgKiBtZXRob2QgY2FsbHMgYWxsIGNhbGxiYWNrczogYGVudGVyYCwgYG9wZW5gLCBgdGlja2AsIGBjbG9zZWAsIGFuZCBcclxuICAgICAqIGBleGl0YC4gSXQgb25seSBvcGVucyBhIG5vZGUgaWYgaXQgaXMgbm90IGFscmVhZHkgb3Blbi4gSW4gdGhlIHNhbWUgXHJcbiAgICAgKiB3YXksIHRoaXMgbWV0aG9kIG9ubHkgY2xvc2UgYSBub2RlIGlmIHRoZSBub2RlICByZXR1cm5lZCBhIHN0YXR1cyBcclxuICAgICAqIGRpZmZlcmVudCBvZiBgYjMuUlVOTklOR2AuXHJcbiAgICAgKlxyXG4gICAgICogQG1ldGhvZCBfZXhlY3V0ZVxyXG4gICAgICogQHBhcmFtIHRpY2sgQSB0aWNrIGluc3RhbmNlLlxyXG4gICAgICogQHJldHVybiB7Q29uc3RhbnR9IFRoZSB0aWNrIHN0YXRlLlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICovXHJcbiAgICBfZXhlY3V0ZSh0aWNrOiBCM1RpY2spOiBCM1N0YXRlIHtcclxuICAgICAgICAvLyBFTlRFUiBcclxuICAgICAgICB0aGlzLl9lbnRlcih0aWNrKTtcclxuXHJcbiAgICAgICAgLy8gT1BFTiBcclxuICAgICAgICBpZiAoIXRpY2suYmxhY2tib2FyZC5nZXQoXCJpc09wZW5cIiwgdGljay50cmVlLmlkLCB0aGlzLmlkKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9vcGVuKHRpY2spO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVElDSyBcclxuICAgICAgICB2YXIgc3RhdHVzID0gdGhpcy5fdGljayh0aWNrKTtcclxuXHJcbiAgICAgICAgLy8gQ0xPU0UgXHJcbiAgICAgICAgaWYgKHN0YXR1cyAhPT0gYjMuUlVOTklORykge1xyXG4gICAgICAgICAgICB0aGlzLl9jbG9zZSh0aWNrKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEVYSVQgXHJcbiAgICAgICAgdGhpcy5fZXhpdCh0aWNrKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHN0YXR1cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdyYXBwZXIgZm9yIGVudGVyIG1ldGhvZC5cclxuICAgICAqIEBtZXRob2QgX2VudGVyXHJcbiAgICAgKiBAcGFyYW0gdGljayBBIHRpY2sgaW5zdGFuY2UuXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKi9cclxuICAgIF9lbnRlcih0aWNrOiBCM1RpY2spOiB2b2lkIHtcclxuICAgICAgICB0aWNrLl9lbnRlck5vZGUodGhpcyk7XHJcbiAgICAgICAgdGhpcy5lbnRlcih0aWNrKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdyYXBwZXIgZm9yIG9wZW4gbWV0aG9kLlxyXG4gICAgICogQG1ldGhvZCBfb3BlblxyXG4gICAgICogQHBhcmFtIHRpY2sgQSB0aWNrIGluc3RhbmNlLlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICovXHJcbiAgICBfb3Blbih0aWNrOiBCM1RpY2spOiB2b2lkIHtcclxuICAgICAgICB0aWNrLl9vcGVuTm9kZSh0aGlzKTtcclxuICAgICAgICB0aWNrLmJsYWNrYm9hcmQuc2V0KFwiaXNPcGVuXCIsIHRydWUsIHRpY2sudHJlZS5pZCwgdGhpcy5pZCk7XHJcbiAgICAgICAgdGhpcy5vcGVuKHRpY2spO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV3JhcHBlciBmb3IgdGljayBtZXRob2QuXHJcbiAgICAgKiBAbWV0aG9kIF90aWNrXHJcbiAgICAgKiBAcGFyYW0gdGljayBBIHRpY2sgaW5zdGFuY2UuXHJcbiAgICAgKiBAcmV0dXJuIHtDb25zdGFudH0gQSBzdGF0ZSBjb25zdGFudC5cclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqL1xyXG4gICAgX3RpY2sodGljazogQjNUaWNrKTogQjNTdGF0ZSB7XHJcbiAgICAgICAgdGljay5fdGlja05vZGUodGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGljayh0aWNrKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdyYXBwZXIgZm9yIGNsb3NlIG1ldGhvZC5cclxuICAgICAqIEBtZXRob2QgX2Nsb3NlXHJcbiAgICAgKiBAcGFyYW0gdGljayBBIHRpY2sgaW5zdGFuY2UuXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKi9cclxuICAgIF9jbG9zZSh0aWNrOiBCM1RpY2spOiB2b2lkIHtcclxuICAgICAgICB0aWNrLl9jbG9zZU5vZGUodGhpcyk7XHJcbiAgICAgICAgdGljay5ibGFja2JvYXJkLnNldChcImlzT3BlblwiLCBmYWxzZSwgdGljay50cmVlLmlkLCB0aGlzLmlkKTtcclxuICAgICAgICB0aGlzLmNsb3NlKHRpY2spO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV3JhcHBlciBmb3IgZXhpdCBtZXRob2QuXHJcbiAgICAgKiBAbWV0aG9kIF9leGl0XHJcbiAgICAgKiBAcGFyYW0gdGljayBBIHRpY2sgaW5zdGFuY2UuXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKi9cclxuICAgIF9leGl0KHRpY2s6IEIzVGljayk6IHZvaWQge1xyXG4gICAgICAgIHRpY2suX2V4aXROb2RlKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuZXhpdCh0aWNrKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEVudGVyIG1ldGhvZCwgb3ZlcnJpZGUgdGhpcyB0byB1c2UuIEl0IGlzIGNhbGxlZCBldmVyeSB0aW1lIGEgbm9kZSBpcyBcclxuICAgICAqIGFza2VkIHRvIGV4ZWN1dGUsIGJlZm9yZSB0aGUgdGljayBpdHNlbGYuXHJcbiAgICAgKlxyXG4gICAgICogQHZpcnR1YWxcclxuICAgICAqIEBtZXRob2QgZW50ZXJcclxuICAgICAqIEBwYXJhbSB0aWNrIEEgdGljayBpbnN0YW5jZS5cclxuICAgICAqL1xyXG4gICAgZW50ZXIodGljazogQjNUaWNrKTogdm9pZCB7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9wZW4gbWV0aG9kLCBvdmVycmlkZSB0aGlzIHRvIHVzZS4gSXQgaXMgY2FsbGVkIG9ubHkgYmVmb3JlIHRoZSB0aWNrIFxyXG4gICAgICogY2FsbGJhY2sgYW5kIG9ubHkgaWYgdGhlIG5vdCBpc25cInQgY2xvc2VkLlxyXG4gICAgICpcclxuICAgICAqIE5vdGU6IGEgbm9kZSB3aWxsIGJlIGNsb3NlZCBpZiBpdCByZXR1cm5lZCBgYjMuUlVOTklOR2AgaW4gdGhlIHRpY2suXHJcbiAgICAgKlxyXG4gICAgICogQHZpcnR1YWxcclxuICAgICAqIEBtZXRob2Qgb3BlblxyXG4gICAgICogQHBhcmFtIHRpY2sgQSB0aWNrIGluc3RhbmNlLlxyXG4gICAgICovXHJcbiAgICBvcGVuKHRpY2s6IEIzVGljayk6IHZvaWQgeyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaWNrIG1ldGhvZCwgb3ZlcnJpZGUgdGhpcyB0byB1c2UuIFRoaXMgbWV0aG9kIG11c3QgY29udGFpbiB0aGUgcmVhbCBcclxuICAgICAqIGV4ZWN1dGlvbiBvZiBub2RlIChwZXJmb3JtIGEgdGFzaywgY2FsbCBjaGlsZHJlbiwgZXRjLikuIEl0IGlzIGNhbGxlZFxyXG4gICAgICogZXZlcnkgdGltZSBhIG5vZGUgaXMgYXNrZWQgdG8gZXhlY3V0ZS5cclxuICAgICAqXHJcbiAgICAgKiBAdmlydHVhbFxyXG4gICAgICogQG1ldGhvZCB0aWNrXHJcbiAgICAgKiBAcGFyYW0gdGljayBBIHRpY2sgaW5zdGFuY2UuXHJcbiAgICAgKi9cclxuICAgIHRpY2sodGljazogQjNUaWNrKTogQjNTdGF0ZSB7IHJldHVybiBiMy5TVUNDRVNTOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbG9zZSBtZXRob2QsIG92ZXJyaWRlIHRoaXMgdG8gdXNlLiBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgYWZ0ZXIgdGhlIHRpY2tcclxuICAgICAqIGNhbGxiYWNrLCBhbmQgb25seSBpZiB0aGUgdGljayByZXR1cm4gYSBzdGF0ZSBkaWZmZXJlbnQgZnJvbSBcclxuICAgICAqIGBiMy5SVU5OSU5HYC5cclxuICAgICAqXHJcbiAgICAgKiBAdmlydHVhbFxyXG4gICAgICogQG1ldGhvZCBjbG9zZVxyXG4gICAgICogQHBhcmFtIHRpY2sgQSB0aWNrIGluc3RhbmNlLlxyXG4gICAgICovXHJcbiAgICBjbG9zZSh0aWNrOiBCM1RpY2spOiB2b2lkIHsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRXhpdCBtZXRob2QsIG92ZXJyaWRlIHRoaXMgdG8gdXNlLiBDYWxsZWQgZXZlcnkgdGltZSBpbiB0aGUgZW5kIG9mIHRoZSBcclxuICAgICAqIGV4ZWN1dGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAdmlydHVhbFxyXG4gICAgICogQG1ldGhvZCBleGl0XHJcbiAgICAgKiBAcGFyYW0gdGljayBBIHRpY2sgaW5zdGFuY2UuXHJcbiAgICAgKi9cclxuICAgIGV4aXQodGljazogQjNUaWNrKTogdm9pZCB7IH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEFjdGlvbiBpcyB0aGUgYmFzZSBjbGFzcyBmb3IgYWxsIGFjdGlvbiBub2Rlcy4gVGh1cywgaWYgeW91IHdhbnQgdG8gY3JlYXRlXHJcbiAqIG5ldyBjdXN0b20gYWN0aW9uIG5vZGVzLCB5b3UgbmVlZCB0byBpbmhlcml0IGZyb20gdGhpcyBjbGFzcy4gRm9yIGV4YW1wbGUsXHJcbiAqIHRha2UgYSBsb29rIGF0IHRoZSBSdW5uZXIgYWN0aW9uOlxyXG4gKiBcclxuICogICAgIHZhciBSdW5uZXIgPSBiMy5DbGFzcyhiMy5BY3Rpb24sIHtcclxuICogICAgICAgbmFtZTogXCJSdW5uZXJcIixcclxuICpcclxuICogICAgICAgdGljazogZnVuY3Rpb24odGljaykge1xyXG4gKiAgICAgICAgIHJldHVybiBiMy5SVU5OSU5HO1xyXG4gKiAgICAgICB9XHJcbiAqICAgICB9KTtcclxuICpcclxuICogQG1vZHVsZSBiM1xyXG4gKiBAY2xhc3MgQWN0aW9uXHJcbiAqIEBleHRlbmRzIEIzQmFzZU5vZGVcclxuICovXHJcbmV4cG9ydCBjbGFzcyBCM0FjdGlvbiBleHRlbmRzIEIzQmFzZU5vZGUge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTm9kZSBjYXRlZ29yeS4gRGVmYXVsdCB0byBgYjMuQUNUSU9OYC5cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBjYXRlZ29yeSA9IGIzLkFDVElPTjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemF0aW9uIG1ldGhvZC5cclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihwYXJhbXM6IGFueSkge1xyXG4gICAgICAgIHN1cGVyKHBhcmFtcyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb21wb3NpdGUgaXMgdGhlIGJhc2UgY2xhc3MgZm9yIGFsbCBjb21wb3NpdGUgbm9kZXMuIFRodXMsIGlmIHlvdSB3YW50IHRvIFxyXG4gKiBjcmVhdGUgbmV3IGN1c3RvbSBjb21wb3NpdGUgbm9kZXMsIHlvdSBuZWVkIHRvIGluaGVyaXQgZnJvbSB0aGlzIGNsYXNzLiBcclxuICogXHJcbiAqIFdoZW4gY3JlYXRpbmcgY29tcG9zaXRlIG5vZGVzLCB5b3Ugd2lsbCBuZWVkIHRvIHByb3BhZ2F0ZSB0aGUgdGljayBzaWduYWwgXHJcbiAqIHRvIHRoZSBjaGlsZHJlbiBub2RlcyBtYW51YWxseS4gVG8gZG8gdGhhdCwgb3ZlcnJpZGUgdGhlIGB0aWNrYCBtZXRob2QgYW5kXHJcbiAqIGNhbGwgdGhlIGBfZXhlY3V0ZWAgbWV0aG9kIG9uIGFsbCBub2Rlcy4gRm9yIGluc3RhbmNlLCB0YWtlIGEgbG9vayBhdCBob3cgXHJcbiAqIHRoZSBTZXF1ZW5jZSBub2RlIGluaGVyaXQgdGhpcyBjbGFzcyBhbmQgaG93IGl0IGNhbGwgaXRzIGNoaWxkcmVuOlxyXG4gKlxyXG4gKiAgICAgLy8gSW5oZXJpdCBmcm9tIENvbXBvc2l0ZSwgdXNpbmcgdGhlIHV0aWwgZnVuY3Rpb24gQ2xhc3MuXHJcbiAqICAgICB2YXIgU2VxdWVuY2UgPSBiMy5DbGFzcyhiMy5Db21wb3NpdGUsIHtcclxuICogICAgIFxyXG4gKiAgICAgICAvLyBSZW1lbWJlciB0byBzZXQgdGhlIG5hbWUgb2YgdGhlIG5vZGUuIFxyXG4gKiAgICAgICBuYW1lOiBcIlNlcXVlbmNlXCIsXHJcbiAqXHJcbiAqICAgICAgIC8vIE92ZXJyaWRlIHRoZSB0aWNrIGZ1bmN0aW9uXHJcbiAqICAgICAgIHRpY2s6IGZ1bmN0aW9uKHRpY2spIHtcclxuICogICAgICAgXHJcbiAqICAgICAgICAgLy8gSXRlcmF0ZXMgb3ZlciB0aGUgY2hpbGRyZW5cclxuICogICAgICAgICBmb3IgKHZhciBpPTA7IGk8dGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gKlxyXG4gKiAgICAgICAgICAgLy8gUHJvcGFnYXRlIHRoZSB0aWNrXHJcbiAqICAgICAgICAgICB2YXIgc3RhdHVzID0gdGhpcy5jaGlsZHJlbltpXS5fZXhlY3V0ZSh0aWNrKTtcclxuICogXHJcbiAqICAgICAgICAgICBpZiAoc3RhdHVzICE9PSBiMy5TVUNDRVNTKSB7XHJcbiAqICAgICAgICAgICAgICAgcmV0dXJuIHN0YXR1cztcclxuICogICAgICAgICAgIH1cclxuICogICAgICAgICB9XHJcbiAqXHJcbiAqICAgICAgICAgcmV0dXJuIGIzLlNVQ0NFU1M7XHJcbiAqICAgICAgIH1cclxuICogICAgIH0pO1xyXG4gKiBcclxuICogQG1vZHVsZSBiM1xyXG4gKiBAY2xhc3MgQ29tcG9zaXRlXHJcbiAqIEBleHRlbmRzIEIzQmFzZU5vZGVcclxuICovXHJcbmV4cG9ydCBjbGFzcyBCM0NvbXBvc2l0ZSBleHRlbmRzIEIzQmFzZU5vZGUge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTm9kZSBjYXRlZ29yeS4gRGVmYXVsdCB0byBgYjMuQ09NUE9TSVRFYC5cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBjYXRlZ29yeSA9IGIzLkNPTVBPU0lURTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemF0aW9uIG1ldGhvZC5cclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihwYXJhbXM6IGFueSkge1xyXG4gICAgICAgIHN1cGVyKHBhcmFtcyk7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IChwYXJhbXMuY2hpbGRyZW4gfHwgW10pLnNsaWNlKDApO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogQ29uZGl0aW9uIGlzIHRoZSBiYXNlIGNsYXNzIGZvciBhbGwgY29uZGl0aW9uIG5vZGVzLiBUaHVzLCBpZiB5b3Ugd2FudCB0byBcclxuICogY3JlYXRlIG5ldyBjdXN0b20gY29uZGl0aW9uIG5vZGVzLCB5b3UgbmVlZCB0byBpbmhlcml0IGZyb20gdGhpcyBjbGFzcy4gXHJcbiAqXHJcbiAqIEBjbGFzcyBDb25kaXRpb25cclxuICogQGV4dGVuZHMgQjNCYXNlTm9kZVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEIzQ29uZGl0aW9uIGV4dGVuZHMgQjNCYXNlTm9kZSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOb2RlIGNhdGVnb3J5LiBEZWZhdWx0IHRvIGBiMy5DT05ESVRJT05gLlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIGNhdGVnb3J5ID0gYjMuQ09ORElUSU9OO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6YXRpb24gbWV0aG9kLlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHBhcmFtczogYW55KSB7XHJcbiAgICAgICAgc3VwZXIocGFyYW1zKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZWNvcmF0b3IgaXMgdGhlIGJhc2UgY2xhc3MgZm9yIGFsbCBkZWNvcmF0b3Igbm9kZXMuIFRodXMsIGlmIHlvdSB3YW50IHRvIFxyXG4gKiBjcmVhdGUgbmV3IGN1c3RvbSBkZWNvcmF0b3Igbm9kZXMsIHlvdSBuZWVkIHRvIGluaGVyaXQgZnJvbSB0aGlzIGNsYXNzLiBcclxuICogXHJcbiAqIFdoZW4gY3JlYXRpbmcgZGVjb3JhdG9yIG5vZGVzLCB5b3Ugd2lsbCBuZWVkIHRvIHByb3BhZ2F0ZSB0aGUgdGljayBzaWduYWxcclxuICogdG8gdGhlIGNoaWxkIG5vZGUgbWFudWFsbHksIGp1c3QgbGlrZSB0aGUgY29tcG9zaXRlIG5vZGVzLiBUbyBkbyB0aGF0LCBcclxuICogb3ZlcnJpZGUgdGhlIGB0aWNrYCBtZXRob2QgYW5kIGNhbGwgdGhlIGBfZXhlY3V0ZWAgbWV0aG9kIG9uIHRoZSBjaGlsZCBcclxuICogbm9kZS4gRm9yIGluc3RhbmNlLCB0YWtlIGEgbG9vayBhdCBob3cgdGhlIEludmVydGVyIG5vZGUgaW5oZXJpdCB0aGlzIFxyXG4gKiBjbGFzcyBhbmQgaG93IGl0IGNhbGwgaXRzIGNoaWxkcmVuOlxyXG4gKiBcclxuICogICAgIC8vIEluaGVyaXQgZnJvbSBEZWNvcmF0b3IsIHVzaW5nIHRoZSB1dGlsIGZ1bmN0aW9uIENsYXNzLlxyXG4gKiAgICAgdmFyIEludmVydGVyID0gYjMuQ2xhc3MoYjMuRGVjb3JhdG9yLCB7XHJcbiAqICAgICAgIG5hbWU6IFwiSW52ZXJ0ZXJcIixcclxuICpcclxuICogICAgICAgdGljazogZnVuY3Rpb24odGljaykge1xyXG4gKiAgICAgICAgIGlmICghdGhpcy5jaGlsZCkge1xyXG4gKiAgICAgICAgICAgcmV0dXJuIGIzLkVSUk9SO1xyXG4gKiAgICAgICAgIH1cclxuICogICAgIFxyXG4gKiAgICAgICAgIC8vIFByb3BhZ2F0ZSB0aGUgdGlja1xyXG4gKiAgICAgICAgIHZhciBzdGF0dXMgPSB0aGlzLmNoaWxkLl9leGVjdXRlKHRpY2spO1xyXG4gKiAgICAgXHJcbiAqICAgICAgICAgaWYgKHN0YXR1cyA9PSBiMy5TVUNDRVNTKSB7XHJcbiAqICAgICAgICAgICBzdGF0dXMgPSBiMy5GQUlMVVJFO1xyXG4gKiAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09IGIzLkZBSUxVUkUpIHtcclxuICogICAgICAgICAgIHN0YXR1cyA9IGIzLlNVQ0NFU1M7XHJcbiAqICAgICAgICAgfVxyXG4gKiAgICAgXHJcbiAqICAgICAgICAgcmV0dXJuIHN0YXR1cztcclxuICogICAgICAgfVxyXG4gKiAgICAgfSk7XHJcbiAqXHJcbiAqIEBtb2R1bGUgYjNcclxuICogQGNsYXNzIERlY29yYXRvclxyXG4gKiBAZXh0ZW5kcyBCM0Jhc2VOb2RlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQjNEZWNvcmF0b3IgZXh0ZW5kcyBCM0Jhc2VOb2RlIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE5vZGUgY2F0ZWdvcnkuIERlZmF1bHQgdG8gYjMuREVDT1JBVE9SLlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIGNhdGVnb3J5ID0gYjMuREVDT1JBVE9SO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6YXRpb24gbWV0aG9kLlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHBhcmFtczogYW55KSB7XHJcbiAgICAgICAgc3VwZXIocGFyYW1zKTtcclxuICAgICAgICB0aGlzLmNoaWxkID0gcGFyYW1zLmNoaWxkIHx8IG51bGw7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNZW1Qcmlvcml0eSBpcyBzaW1pbGFyIHRvIFByaW9yaXR5IG5vZGUsIGJ1dCB3aGVuIGEgY2hpbGQgcmV0dXJucyBhIFxyXG4gKiBgUlVOTklOR2Agc3RhdGUsIGl0cyBpbmRleCBpcyByZWNvcmRlZCBhbmQgaW4gdGhlIG5leHQgdGljayB0aGUsIFxyXG4gKiBNZW1Qcmlvcml0eSBjYWxscyB0aGUgY2hpbGQgcmVjb3JkZWQgZGlyZWN0bHksIHdpdGhvdXQgY2FsbGluZyBwcmV2aW91cyBcclxuICogY2hpbGRyZW4gYWdhaW4uXHJcbiAqXHJcbiAqIEBtb2R1bGUgYjNcclxuICogQGNsYXNzIE1lbVByaW9yaXR5XHJcbiAqIEBleHRlbmRzIEIzQ29tcG9zaXRlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQjNNZW1Qcmlvcml0eSBleHRlbmRzIEIzQ29tcG9zaXRlIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE5vZGUgbmFtZS4gRGVmYXVsdCB0byBgTWVtUHJpb3JpdHlgLlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIG5hbWUgPSBcIk1lbVByaW9yaXR5XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPcGVuIG1ldGhvZC5cclxuICAgICAqIEBtZXRob2Qgb3BlblxyXG4gICAgICogQHBhcmFtIHRpY2sgQSB0aWNrIGluc3RhbmNlLlxyXG4gICAgICovXHJcbiAgICBvcGVuKHRpY2s6IEIzVGljayk6IHZvaWQge1xyXG4gICAgICAgIHRpY2suYmxhY2tib2FyZC5zZXQoXCJydW5uaW5nQ2hpbGRcIiwgMCwgdGljay50cmVlLmlkLCB0aGlzLmlkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRpY2sgbWV0aG9kLlxyXG4gICAgICogQG1ldGhvZCB0aWNrXHJcbiAgICAgKiBAcGFyYW0gdGljayBBIHRpY2sgaW5zdGFuY2UuXHJcbiAgICAgKiBAcmV0dXJuIHtDb25zdGFudH0gQSBzdGF0ZSBjb25zdGFudC5cclxuICAgICAqL1xyXG4gICAgdGljayh0aWNrOiBCM1RpY2spOiBCM1N0YXRlIHtcclxuICAgICAgICB2YXIgY2hpbGQgPSB0aWNrLmJsYWNrYm9hcmQuZ2V0KFwicnVubmluZ0NoaWxkXCIsIHRpY2sudHJlZS5pZCwgdGhpcy5pZCk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IGNoaWxkOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgc3RhdHVzID0gdGhpcy5jaGlsZHJlbltpXS5fZXhlY3V0ZSh0aWNrKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMgIT09IGIzLkZBSUxVUkUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09IGIzLlJVTk5JTkcpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aWNrLmJsYWNrYm9hcmQuc2V0KFwicnVubmluZ0NoaWxkXCIsIGksIHRpY2sudHJlZS5pZCwgdGhpcy5pZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXR1cztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGIzLkZBSUxVUkU7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNZW1TZXF1ZW5jZSBpcyBzaW1pbGFyIHRvIFNlcXVlbmNlIG5vZGUsIGJ1dCB3aGVuIGEgY2hpbGQgcmV0dXJucyBhIFxyXG4gKiBgUlVOTklOR2Agc3RhdGUsIGl0cyBpbmRleCBpcyByZWNvcmRlZCBhbmQgaW4gdGhlIG5leHQgdGljayB0aGUgXHJcbiAqIE1lbVNlcXVlbmNlIGNhbGwgdGhlIGNoaWxkIHJlY29yZGVkIGRpcmVjdGx5LCB3aXRob3V0IGNhbGxpbmcgcHJldmlvdXMgXHJcbiAqIGNoaWxkcmVuIGFnYWluLlxyXG4gKlxyXG4gKiBAbW9kdWxlIGIzXHJcbiAqIEBjbGFzcyBNZW1TZXF1ZW5jZVxyXG4gKiBAZXh0ZW5kcyBCM0NvbXBvc2l0ZVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEIzTWVtU2VxdWVuY2UgZXh0ZW5kcyBCM0NvbXBvc2l0ZSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOb2RlIG5hbWUuIERlZmF1bHQgdG8gYE1lbVNlcXVlbmNlYC5cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBuYW1lID0gXCJNZW1TZXF1ZW5jZVwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogT3BlbiBtZXRob2QuXHJcbiAgICAgKiBAbWV0aG9kIG9wZW5cclxuICAgICAqIEBwYXJhbSB0aWNrIEEgdGljayBpbnN0YW5jZS5cclxuICAgICAqL1xyXG4gICAgb3Blbih0aWNrOiBCM1RpY2spIHtcclxuICAgICAgICB0aWNrLmJsYWNrYm9hcmQuc2V0KFwicnVubmluZ0NoaWxkXCIsIDAsIHRpY2sudHJlZS5pZCwgdGhpcy5pZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaWNrIG1ldGhvZC5cclxuICAgICAqIEBtZXRob2QgdGlja1xyXG4gICAgICogQHBhcmFtIHRpY2sgQSB0aWNrIGluc3RhbmNlLlxyXG4gICAgICogQHJldHVybiB7Q29uc3RhbnR9IEEgc3RhdGUgY29uc3RhbnQuXHJcbiAgICAgKi9cclxuICAgIHRpY2sodGljazogQjNUaWNrKTogQjNTdGF0ZSB7XHJcbiAgICAgICAgdmFyIGNoaWxkID0gdGljay5ibGFja2JvYXJkLmdldChcInJ1bm5pbmdDaGlsZFwiLCB0aWNrLnRyZWUuaWQsIHRoaXMuaWQpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSBjaGlsZDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHN0YXR1cyA9IHRoaXMuY2hpbGRyZW5baV0uX2V4ZWN1dGUodGljayk7XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhdHVzICE9PSBiMy5TVUNDRVNTKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzID09PSBiMy5SVU5OSU5HKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGljay5ibGFja2JvYXJkLnNldChcInJ1bm5pbmdDaGlsZFwiLCBpLCB0aWNrLnRyZWUuaWQsIHRoaXMuaWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXR1cztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGIzLlNVQ0NFU1M7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQcmlvcml0eSB0aWNrcyBpdHMgY2hpbGRyZW4gc2VxdWVudGlhbGx5IHVudGlsIG9uZSBvZiB0aGVtIHJldHVybnMgXHJcbiAqIGBTVUNDRVNTYCwgYFJVTk5JTkdgIG9yIGBFUlJPUmAuIElmIGFsbCBjaGlsZHJlbiByZXR1cm4gdGhlIGZhaWx1cmUgc3RhdGUsXHJcbiAqIHRoZSBwcmlvcml0eSBhbHNvIHJldHVybnMgYEZBSUxVUkVgLlxyXG4gKlxyXG4gKiBAbW9kdWxlIGIzXHJcbiAqIEBjbGFzcyBQcmlvcml0eVxyXG4gKiBAZXh0ZW5kcyBCM0NvbXBvc2l0ZVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEIzUHJpb3JpdHkgZXh0ZW5kcyBCM0NvbXBvc2l0ZSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOb2RlIG5hbWUuIERlZmF1bHQgdG8gYFByaW9yaXR5YC5cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBuYW1lID0gXCJQcmlvcml0eVwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGljayBtZXRob2QuXHJcbiAgICAgKiBAbWV0aG9kIHRpY2tcclxuICAgICAqIEBwYXJhbSB0aWNrIEEgdGljayBpbnN0YW5jZS5cclxuICAgICAqIEByZXR1cm4ge0NvbnN0YW50fSBBIHN0YXRlIGNvbnN0YW50LlxyXG4gICAgICovXHJcbiAgICB0aWNrKHRpY2s6IEIzVGljayk6IEIzU3RhdGUge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgc3RhdHVzID0gdGhpcy5jaGlsZHJlbltpXS5fZXhlY3V0ZSh0aWNrKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMgIT09IGIzLkZBSUxVUkUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0dXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBiMy5GQUlMVVJFO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogVGhlIFNlcXVlbmNlIG5vZGUgdGlja3MgaXRzIGNoaWxkcmVuIHNlcXVlbnRpYWxseSB1bnRpbCBvbmUgb2YgdGhlbSBcclxuICogcmV0dXJucyBgRkFJTFVSRWAsIGBSVU5OSU5HYCBvciBgRVJST1JgLiBJZiBhbGwgY2hpbGRyZW4gcmV0dXJuIHRoZSBcclxuICogc3VjY2VzcyBzdGF0ZSwgdGhlIHNlcXVlbmNlIGFsc28gcmV0dXJucyBgU1VDQ0VTU2AuXHJcbiAqXHJcbiAqIEBtb2R1bGUgYjNcclxuICogQGNsYXNzIFNlcXVlbmNlXHJcbiAqIEBleHRlbmRzIEIzQ29tcG9zaXRlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQjNTZXF1ZW5jZSBleHRlbmRzIEIzQ29tcG9zaXRlIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE5vZGUgbmFtZS4gRGVmYXVsdCB0byBgU2VxdWVuY2VgLlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIG5hbWUgPSBcIlNlcXVlbmNlXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaWNrIG1ldGhvZC5cclxuICAgICAqIEBtZXRob2QgdGlja1xyXG4gICAgICogQHBhcmFtIHRpY2sgQSB0aWNrIGluc3RhbmNlLlxyXG4gICAgICogQHJldHVybiB7Q29uc3RhbnR9IEEgc3RhdGUgY29uc3RhbnQuXHJcbiAgICAgKi9cclxuICAgIHRpY2sodGljazogQjNUaWNrKTogQjNTdGF0ZSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBzdGF0dXMgPSB0aGlzLmNoaWxkcmVuW2ldLl9leGVjdXRlKHRpY2spO1xyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXR1cyAhPT0gYjMuU1VDQ0VTUykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXR1cztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGIzLlNVQ0NFU1M7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgSW52ZXJ0ZXIgZGVjb3JhdG9yIGludmVydHMgdGhlIHJlc3VsdCBvZiB0aGUgY2hpbGQsIHJldHVybmluZyBgU1VDQ0VTU2BcclxuICogZm9yIGBGQUlMVVJFYCBhbmQgYEZBSUxVUkVgIGZvciBgU1VDQ0VTU2AuXHJcbiAqXHJcbiAqIEBtb2R1bGUgYjNcclxuICogQGNsYXNzIEludmVydGVyXHJcbiAqIEBleHRlbmRzIEIzRGVjb3JhdG9yXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQjNJbnZlcnRlciBleHRlbmRzIEIzRGVjb3JhdG9yIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE5vZGUgbmFtZS4gRGVmYXVsdCB0byBgSW52ZXJ0ZXJgLlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIG5hbWUgPSBcIkludmVydGVyXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaWNrIG1ldGhvZC5cclxuICAgICAqIEBtZXRob2QgdGlja1xyXG4gICAgICogQHBhcmFtIHRpY2sgQSB0aWNrIGluc3RhbmNlLlxyXG4gICAgICogQHJldHVybiB7Q29uc3RhbnR9IEEgc3RhdGUgY29uc3RhbnQuXHJcbiAgICAgKi9cclxuICAgIHRpY2sodGljazogQjNUaWNrKTogQjNTdGF0ZSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNoaWxkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBiMy5FUlJPUjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBzdGF0dXMgPSB0aGlzLmNoaWxkLl9leGVjdXRlKHRpY2spO1xyXG5cclxuICAgICAgICBpZiAoc3RhdHVzID09IGIzLlNVQ0NFU1MpIHtcclxuICAgICAgICAgICAgc3RhdHVzID0gYjMuRkFJTFVSRTtcclxuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PSBiMy5GQUlMVVJFKSB7XHJcbiAgICAgICAgICAgIHN0YXR1cyA9IGIzLlNVQ0NFU1M7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc3RhdHVzO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogVGhpcyBkZWNvcmF0b3IgbGltaXQgdGhlIG51bWJlciBvZiB0aW1lcyBpdHMgY2hpbGQgY2FuIGJlIGNhbGxlZC4gQWZ0ZXIgYVxyXG4gKiBjZXJ0YWluIG51bWJlciBvZiB0aW1lcywgdGhlIExpbWl0ZXIgZGVjb3JhdG9yIHJldHVybnMgYEZBSUxVUkVgIHdpdGhvdXQgXHJcbiAqIGV4ZWN1dGluZyB0aGUgY2hpbGQuXHJcbiAqXHJcbiAqIEBtb2R1bGUgYjNcclxuICogQGNsYXNzIExpbWl0ZXJcclxuICogQGV4dGVuZHMgQjNEZWNvcmF0b3JcclxuICovXHJcbmV4cG9ydCBjbGFzcyBCM0xpbWl0ZXIgZXh0ZW5kcyBCM0RlY29yYXRvciB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOb2RlIG5hbWUuIERlZmF1bHQgdG8gYExpbWl0ZXJgLlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIG5hbWUgPSBcIkxpbWl0ZXJcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE5vZGUgdGl0bGUuIERlZmF1bHQgdG8gYExpbWl0IFggQWN0aXZhdGlvbnNgLiBVc2VkIGluIEVkaXRvci5cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICB0aXRsZSA9IFwiTGltaXQgPG1heExvb3A+IEFjdGl2YXRpb25zXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOb2RlIHBhcmFtZXRlcnMuXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgcGFyYW1ldGVycyA9IHsgXCJtYXhMb29wXCI6IDEgfTtcclxuXHJcbiAgICBtYXhMb29wOiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXphdGlvbiBtZXRob2QuIFxyXG4gICAgICpcclxuICAgICAqIFNldHRpbmdzIHBhcmFtZXRlcnM6XHJcbiAgICAgKlxyXG4gICAgICogLSAqKm1heExvb3AqKiAoKkludGVnZXIqKSBNYXhpbXVtIG51bWJlciBvZiByZXBldGl0aW9ucy5cclxuICAgICAqIC0gKipjaGlsZCoqICgqQmFzZU5vZGUqKSBUaGUgY2hpbGQgbm9kZS5cclxuICAgICAqXHJcbiAgICAgKiBAbWV0aG9kIGluaXRpYWxpemVcclxuICAgICAqIEBwYXJhbSBwYXJhbXMgT2JqZWN0IHdpdGggcGFyYW1ldGVycy5cclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihwYXJhbXM6IGFueSkge1xyXG4gICAgICAgIHN1cGVyKHBhcmFtcyk7XHJcblxyXG4gICAgICAgIGlmICghcGFyYW1zLm1heExvb3ApIHtcclxuICAgICAgICAgICAgdGhyb3cgXCJtYXhMb29wIHBhcmFtZXRlciBpbiBMaW1pdGVyIGRlY29yYXRvciBpcyBhbiBvYmxpZ2F0b3J5IFwiICtcclxuICAgICAgICAgICAgXCJwYXJhbWV0ZXJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubWF4TG9vcCA9IHBhcmFtcy5tYXhMb29wO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT3BlbiBtZXRob2QuXHJcbiAgICAgKiBAbWV0aG9kIG9wZW5cclxuICAgICAqIEBwYXJhbSB0aWNrIEEgdGljayBpbnN0YW5jZS5cclxuICAgICAqL1xyXG4gICAgb3Blbih0aWNrOiBCM1RpY2spOiB2b2lkIHtcclxuICAgICAgICB0aWNrLmJsYWNrYm9hcmQuc2V0KFwiaVwiLCAwLCB0aWNrLnRyZWUuaWQsIHRoaXMuaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGljayBtZXRob2QuXHJcbiAgICAgKiBAbWV0aG9kIHRpY2tcclxuICAgICAqIEBwYXJhbSB0aWNrIEEgdGljayBpbnN0YW5jZS5cclxuICAgICAqIEByZXR1cm4ge0NvbnN0YW50fSBBIHN0YXRlIGNvbnN0YW50LlxyXG4gICAgICovXHJcbiAgICB0aWNrKHRpY2s6IEIzVGljayk6IEIzU3RhdGUge1xyXG4gICAgICAgIGlmICghdGhpcy5jaGlsZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYjMuRVJST1I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgaSA9IHRpY2suYmxhY2tib2FyZC5nZXQoXCJpXCIsIHRpY2sudHJlZS5pZCwgdGhpcy5pZCk7XHJcblxyXG4gICAgICAgIGlmIChpIDwgdGhpcy5tYXhMb29wKSB7XHJcbiAgICAgICAgICAgIHZhciBzdGF0dXMgPSB0aGlzLmNoaWxkLl9leGVjdXRlKHRpY2spO1xyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PSBiMy5TVUNDRVNTIHx8IHN0YXR1cyA9PSBiMy5GQUlMVVJFKVxyXG4gICAgICAgICAgICAgICAgdGljay5ibGFja2JvYXJkLnNldChcImlcIiwgaSArIDEsIHRpY2sudHJlZS5pZCwgdGhpcy5pZCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc3RhdHVzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGIzLkZBSUxVUkU7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgTWF4VGltZSBkZWNvcmF0b3IgbGltaXRzIHRoZSBtYXhpbXVtIHRpbWUgdGhlIG5vZGUgY2hpbGQgY2FuIGV4ZWN1dGUuIFxyXG4gKiBOb3RpY2UgdGhhdCBpdCBkb2VzIG5vdCBpbnRlcnJ1cHQgdGhlIGV4ZWN1dGlvbiBpdHNlbGYgKGkuZS4sIHRoZSBjaGlsZCBcclxuICogbXVzdCBiZSBub24tcHJlZW1wdGl2ZSksIGl0IG9ubHkgaW50ZXJydXB0cyB0aGUgbm9kZSBhZnRlciBhIGBSVU5OSU5HYCBcclxuICogc3RhdHVzLlxyXG4gKlxyXG4gKiBAbW9kdWxlIGIzXHJcbiAqIEBjbGFzcyBNYXhUaW1lXHJcbiAqIEBleHRlbmRzIEIzRGVjb3JhdG9yXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQjNNYXhUaW1lIGV4dGVuZHMgQjNEZWNvcmF0b3Ige1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTm9kZSBuYW1lLiBEZWZhdWx0IHRvIGBNYXhUaW1lYC5cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBuYW1lID0gXCJNYXhUaW1lXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOb2RlIHRpdGxlLiBEZWZhdWx0IHRvIGBNYXggWFhtc2AuIFVzZWQgaW4gRWRpdG9yLlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIHRpdGxlID0gXCJNYXggPG1heFRpbWU+bXNcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE5vZGUgcGFyYW1ldGVycy5cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBwYXJhbWV0ZXJzID0geyBcIm1heFRpbWVcIjogMCB9O1xyXG5cclxuICAgIG1heFRpbWU6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemF0aW9uIG1ldGhvZC5cclxuICAgICAqXHJcbiAgICAgKiBTZXR0aW5ncyBwYXJhbWV0ZXJzOlxyXG4gICAgICpcclxuICAgICAqIC0gKiptYXhUaW1lKiogKCpJbnRlZ2VyKikgTWF4aW11bSB0aW1lIGEgY2hpbGQgY2FuIGV4ZWN1dGUuXHJcbiAgICAgKiAtICoqY2hpbGQqKiAoKkJhc2VOb2RlKikgVGhlIGNoaWxkIG5vZGUuXHJcbiAgICAgKlxyXG4gICAgICogQG1ldGhvZCBpbml0aWFsaXplXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1zIE9iamVjdCB3aXRoIHBhcmFtZXRlcnMuXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IocGFyYW1zOiBhbnkpIHtcclxuICAgICAgICBzdXBlcihwYXJhbXMpO1xyXG5cclxuICAgICAgICBpZiAoIXBhcmFtcy5tYXhUaW1lKSB7XHJcbiAgICAgICAgICAgIHRocm93IFwibWF4VGltZSBwYXJhbWV0ZXIgaW4gTWF4VGltZSBkZWNvcmF0b3IgaXMgYW4gb2JsaWdhdG9yeSBcIiArXHJcbiAgICAgICAgICAgIFwicGFyYW1ldGVyXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm1heFRpbWUgPSBwYXJhbXMubWF4VGltZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9wZW4gbWV0aG9kLlxyXG4gICAgICogQG1ldGhvZCBvcGVuXHJcbiAgICAgKiBAcGFyYW0gdGljayBBIHRpY2sgaW5zdGFuY2UuXHJcbiAgICAgKi9cclxuICAgIG9wZW4odGljazogQjNUaWNrKTogdm9pZCB7XHJcbiAgICAgICAgdmFyIHN0YXJ0VGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgdGljay5ibGFja2JvYXJkLnNldChcInN0YXJ0VGltZVwiLCBzdGFydFRpbWUsIHRpY2sudHJlZS5pZCwgdGhpcy5pZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaWNrIG1ldGhvZC5cclxuICAgICAqIEBtZXRob2QgdGlja1xyXG4gICAgICogQHBhcmFtIHRpY2sgQSB0aWNrIGluc3RhbmNlLlxyXG4gICAgICogQHJldHVybiB7Q29uc3RhbnR9IEEgc3RhdGUgY29uc3RhbnQuXHJcbiAgICAgKi9cclxuICAgIHRpY2sodGljazogQjNUaWNrKTogQjNTdGF0ZSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNoaWxkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBiMy5FUlJPUjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBjdXJyVGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgdmFyIHN0YXJ0VGltZSA9IHRpY2suYmxhY2tib2FyZC5nZXQoXCJzdGFydFRpbWVcIiwgdGljay50cmVlLmlkLCB0aGlzLmlkKTtcclxuXHJcbiAgICAgICAgdmFyIHN0YXR1cyA9IHRoaXMuY2hpbGQuX2V4ZWN1dGUodGljayk7XHJcbiAgICAgICAgaWYgKGN1cnJUaW1lIC0gc3RhcnRUaW1lID4gdGhpcy5tYXhUaW1lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBiMy5GQUlMVVJFO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHN0YXR1cztcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFJlcGVhdFVudGlsRmFpbHVyZSBpcyBhIGRlY29yYXRvciB0aGF0IHJlcGVhdHMgdGhlIHRpY2sgc2lnbmFsIHVudGlsIHRoZSBcclxuICogbm9kZSBjaGlsZCByZXR1cm5zIGBGQUlMVVJFYCwgYFJVTk5JTkdgIG9yIGBFUlJPUmAuIE9wdGlvbmFsbHksIGEgbWF4aW11bSBcclxuICogbnVtYmVyIG9mIHJlcGV0aXRpb25zIGNhbiBiZSBkZWZpbmVkLlxyXG4gKlxyXG4gKiBAbW9kdWxlIGIzXHJcbiAqIEBjbGFzcyBSZXBlYXRVbnRpbEZhaWx1cmVcclxuICogQGV4dGVuZHMgQjNEZWNvcmF0b3JcclxuICovXHJcbmV4cG9ydCBjbGFzcyBCM1JlcGVhdFVudGlsRmFpbHVyZSBleHRlbmRzIEIzRGVjb3JhdG9yIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE5vZGUgbmFtZS4gRGVmYXVsdCB0byBgUmVwZWF0VW50aWxGYWlsdXJlYC5cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBuYW1lID0gXCJSZXBlYXRVbnRpbEZhaWx1cmVcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE5vZGUgdGl0bGUuIERlZmF1bHQgdG8gYFJlcGVhdCBVbnRpbCBGYWlsdXJlYC5cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICB0aXRsZSA9IFwiUmVwZWF0IFVudGlsIEZhaWx1cmVcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE5vZGUgcGFyYW1ldGVycy5cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBwYXJhbWV0ZXJzID0geyBcIm1heExvb3BcIjogLTEgfTtcclxuXHJcbiAgICBtYXhMb29wOiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXphdGlvbiBtZXRob2QuXHJcbiAgICAgKlxyXG4gICAgICogU2V0dGluZ3MgcGFyYW1ldGVyczpcclxuICAgICAqXHJcbiAgICAgKiAtICoqbWF4TG9vcCoqICgqSW50ZWdlciopIE1heGltdW0gbnVtYmVyIG9mIHJlcGV0aXRpb25zLiBEZWZhdWx0IHRvIC0xIFxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAoaW5maW5pdGUpLlxyXG4gICAgICogLSAqKmNoaWxkKiogKCpCYXNlTm9kZSopIFRoZSBjaGlsZCBub2RlLlxyXG4gICAgICpcclxuICAgICAqIEBtZXRob2QgaW5pdGlhbGl6ZVxyXG4gICAgICogQHBhcmFtIHBhcmFtcyBPYmplY3Qgd2l0aCBwYXJhbWV0ZXJzLlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHBhcmFtczogYW55KSB7XHJcbiAgICAgICAgc3VwZXIocGFyYW1zKTtcclxuICAgICAgICB0aGlzLm1heExvb3AgPSBwYXJhbXMubWF4TG9vcCB8fCAtMTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9wZW4gbWV0aG9kLlxyXG4gICAgICogQG1ldGhvZCBvcGVuXHJcbiAgICAgKiBAcGFyYW0gdGljayBBIHRpY2sgaW5zdGFuY2UuXHJcbiAgICAgKi9cclxuICAgIG9wZW4odGljazogQjNUaWNrKTogdm9pZCB7XHJcbiAgICAgICAgdGljay5ibGFja2JvYXJkLnNldChcImlcIiwgMCwgdGljay50cmVlLmlkLCB0aGlzLmlkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRpY2sgbWV0aG9kLlxyXG4gICAgICogQG1ldGhvZCB0aWNrXHJcbiAgICAgKiBAcGFyYW0gdGljayBBIHRpY2sgaW5zdGFuY2UuXHJcbiAgICAgKiBAcmV0dXJuIHtDb25zdGFudH0gQSBzdGF0ZSBjb25zdGFudC5cclxuICAgICAqL1xyXG4gICAgdGljayh0aWNrOiBCM1RpY2spOiBCM1N0YXRlIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2hpbGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGIzLkVSUk9SO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGkgPSB0aWNrLmJsYWNrYm9hcmQuZ2V0KFwiaVwiLCB0aWNrLnRyZWUuaWQsIHRoaXMuaWQpO1xyXG4gICAgICAgIHZhciBzdGF0dXM6IEIzU3RhdGUgPSBiMy5FUlJPUjtcclxuXHJcbiAgICAgICAgd2hpbGUgKHRoaXMubWF4TG9vcCA8IDAgfHwgaSA8IHRoaXMubWF4TG9vcCkge1xyXG4gICAgICAgICAgICBzdGF0dXMgPSB0aGlzLmNoaWxkLl9leGVjdXRlKHRpY2spO1xyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PSBiMy5TVUNDRVNTKSB7XHJcbiAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaSA9IHRpY2suYmxhY2tib2FyZC5zZXQoXCJpXCIsIGksIHRpY2sudHJlZS5pZCwgdGhpcy5pZCk7XHJcbiAgICAgICAgcmV0dXJuIHN0YXR1cztcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFJlcGVhdFVudGlsU3VjY2VzcyBpcyBhIGRlY29yYXRvciB0aGF0IHJlcGVhdHMgdGhlIHRpY2sgc2lnbmFsIHVudGlsIHRoZSBcclxuICogbm9kZSBjaGlsZCByZXR1cm5zIGBTVUNDRVNTYCwgYFJVTk5JTkdgIG9yIGBFUlJPUmAuIE9wdGlvbmFsbHksIGEgbWF4aW11bSBcclxuICogbnVtYmVyIG9mIHJlcGV0aXRpb25zIGNhbiBiZSBkZWZpbmVkLlxyXG4gKlxyXG4gKiBAbW9kdWxlIGIzXHJcbiAqIEBjbGFzcyBSZXBlYXRVbnRpbFN1Y2Nlc3NcclxuICogQGV4dGVuZHMgQjNEZWNvcmF0b3JcclxuICovXHJcbmV4cG9ydCBjbGFzcyBCM1JlcGVhdFVudGlsU3VjY2VzcyBleHRlbmRzIEIzRGVjb3JhdG9yIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE5vZGUgbmFtZS4gRGVmYXVsdCB0byBgUmVwZWF0VW50aWxTdWNjZXNzYC5cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBuYW1lID0gXCJSZXBlYXRVbnRpbFN1Y2Nlc3NcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE5vZGUgdGl0bGUuIERlZmF1bHQgdG8gYFJlcGVhdCBVbnRpbCBTdWNjZXNzYC5cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICB0aXRsZSA9IFwiUmVwZWF0IFVudGlsIFN1Y2Nlc3NcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE5vZGUgcGFyYW1ldGVycy5cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBwYXJhbWV0ZXJzID0geyBcIm1heExvb3BcIjogLTEgfTtcclxuXHJcbiAgICBtYXhMb29wOiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXphdGlvbiBtZXRob2QuXHJcbiAgICAgKlxyXG4gICAgICogU2V0dGluZ3MgcGFyYW1ldGVyczpcclxuICAgICAqXHJcbiAgICAgKiAtICoqbWF4TG9vcCoqICgqSW50ZWdlciopIE1heGltdW0gbnVtYmVyIG9mIHJlcGV0aXRpb25zLiBEZWZhdWx0IHRvIC0xIFxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAoaW5maW5pdGUpLlxyXG4gICAgICogLSAqKmNoaWxkKiogKCpCYXNlTm9kZSopIFRoZSBjaGlsZCBub2RlLlxyXG4gICAgICpcclxuICAgICAqIEBtZXRob2QgaW5pdGlhbGl6ZVxyXG4gICAgICogQHBhcmFtIHBhcmFtcyBPYmplY3Qgd2l0aCBwYXJhbWV0ZXJzLlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHBhcmFtczogYW55KSB7XHJcbiAgICAgICAgc3VwZXIocGFyYW1zKTtcclxuICAgICAgICB0aGlzLm1heExvb3AgPSBwYXJhbXMubWF4TG9vcCB8fCAtMTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9wZW4gbWV0aG9kLlxyXG4gICAgICogQG1ldGhvZCBvcGVuXHJcbiAgICAgKiBAcGFyYW0gdGljayBBIHRpY2sgaW5zdGFuY2UuXHJcbiAgICAgKi9cclxuICAgIG9wZW4odGljazogQjNUaWNrKTogdm9pZCB7XHJcbiAgICAgICAgdGljay5ibGFja2JvYXJkLnNldChcImlcIiwgMCwgdGljay50cmVlLmlkLCB0aGlzLmlkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRpY2sgbWV0aG9kLlxyXG4gICAgICogQG1ldGhvZCB0aWNrXHJcbiAgICAgKiBAcGFyYW0gdGljayBBIHRpY2sgaW5zdGFuY2UuXHJcbiAgICAgKiBAcmV0dXJuIHtDb25zdGFudH0gQSBzdGF0ZSBjb25zdGFudC5cclxuICAgICAqL1xyXG4gICAgdGljayh0aWNrOiBCM1RpY2spOiBCM1N0YXRlIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2hpbGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGIzLkVSUk9SO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGkgPSB0aWNrLmJsYWNrYm9hcmQuZ2V0KFwiaVwiLCB0aWNrLnRyZWUuaWQsIHRoaXMuaWQpO1xyXG4gICAgICAgIHZhciBzdGF0dXM6IEIzU3RhdGUgPSBiMy5FUlJPUjtcclxuXHJcbiAgICAgICAgd2hpbGUgKHRoaXMubWF4TG9vcCA8IDAgfHwgaSA8IHRoaXMubWF4TG9vcCkge1xyXG4gICAgICAgICAgICBzdGF0dXMgPSB0aGlzLmNoaWxkLl9leGVjdXRlKHRpY2spO1xyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PSBiMy5GQUlMVVJFKSB7XHJcbiAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaSA9IHRpY2suYmxhY2tib2FyZC5zZXQoXCJpXCIsIGksIHRpY2sudHJlZS5pZCwgdGhpcy5pZCk7XHJcbiAgICAgICAgcmV0dXJuIHN0YXR1cztcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFJlcGVhdGVyIGlzIGEgZGVjb3JhdG9yIHRoYXQgcmVwZWF0cyB0aGUgdGljayBzaWduYWwgdW50aWwgdGhlIGNoaWxkIG5vZGUgXHJcbiAqIHJldHVybiBgUlVOTklOR2Agb3IgYEVSUk9SYC4gT3B0aW9uYWxseSwgYSBtYXhpbXVtIG51bWJlciBvZiByZXBldGl0aW9ucyBcclxuICogY2FuIGJlIGRlZmluZWQuXHJcbiAqXHJcbiAqIEBtb2R1bGUgYjNcclxuICogQGNsYXNzIFJlcGVhdGVyXHJcbiAqIEBleHRlbmRzIEIzRGVjb3JhdG9yXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQjNSZXBlYXRlciBleHRlbmRzIEIzRGVjb3JhdG9yIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE5vZGUgbmFtZS4gRGVmYXVsdCB0byBgUmVwZWF0ZXJgLlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIG5hbWUgPSBcIlJlcGVhdGVyXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOb2RlIHRpdGxlLiBEZWZhdWx0IHRvIGBSZXBlYXQgWFh4YC4gVXNlZCBpbiBFZGl0b3IuXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgdGl0bGUgPSBcIlJlcGVhdCA8bWF4TG9vcD54XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOb2RlIHBhcmFtZXRlcnMuXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgcGFyYW1ldGVycyA9IHsgXCJtYXhMb29wXCI6IC0xIH07XHJcblxyXG4gICAgbWF4TG9vcDogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6YXRpb24gbWV0aG9kLlxyXG4gICAgICpcclxuICAgICAqIFNldHRpbmdzIHBhcmFtZXRlcnM6XHJcbiAgICAgKlxyXG4gICAgICogLSAqKm1heExvb3AqKiAoKkludGVnZXIqKSBNYXhpbXVtIG51bWJlciBvZiByZXBldGl0aW9ucy4gRGVmYXVsdCB0byAtMSBcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgKGluZmluaXRlKS5cclxuICAgICAqIC0gKipjaGlsZCoqICgqQmFzZU5vZGUqKSBUaGUgY2hpbGQgbm9kZS5cclxuICAgICAqIFxyXG4gICAgICogQG1ldGhvZCBpbml0aWFsaXplXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1zIE9iamVjdCB3aXRoIHBhcmFtZXRlcnMuXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IocGFyYW1zOiBhbnkpIHtcclxuICAgICAgICBzdXBlcihwYXJhbXMpO1xyXG4gICAgICAgIHRoaXMubWF4TG9vcCA9IHBhcmFtcy5tYXhMb29wIHx8IC0xO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT3BlbiBtZXRob2QuXHJcbiAgICAgKiBAbWV0aG9kIG9wZW5cclxuICAgICAqIEBwYXJhbSB0aWNrIEEgdGljayBpbnN0YW5jZS5cclxuICAgICAqL1xyXG4gICAgb3Blbih0aWNrOiBCM1RpY2spOiB2b2lkIHtcclxuICAgICAgICB0aWNrLmJsYWNrYm9hcmQuc2V0KFwiaVwiLCAwLCB0aWNrLnRyZWUuaWQsIHRoaXMuaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGljayBtZXRob2QuXHJcbiAgICAgKiBAbWV0aG9kIHRpY2tcclxuICAgICAqIEBwYXJhbSB0aWNrIEEgdGljayBpbnN0YW5jZS5cclxuICAgICAqL1xyXG4gICAgdGljayh0aWNrOiBCM1RpY2spOiBCM1N0YXRlIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2hpbGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGIzLkVSUk9SO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGkgPSB0aWNrLmJsYWNrYm9hcmQuZ2V0KFwiaVwiLCB0aWNrLnRyZWUuaWQsIHRoaXMuaWQpO1xyXG4gICAgICAgIHZhciBzdGF0dXM6IEIzU3RhdGUgPSBiMy5TVUNDRVNTO1xyXG5cclxuICAgICAgICB3aGlsZSAodGhpcy5tYXhMb29wIDwgMCB8fCBpIDwgdGhpcy5tYXhMb29wKSB7XHJcbiAgICAgICAgICAgIHN0YXR1cyA9IHRoaXMuY2hpbGQuX2V4ZWN1dGUodGljayk7XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhdHVzID09IGIzLlNVQ0NFU1MgfHwgc3RhdHVzID09IGIzLkZBSUxVUkUpIHtcclxuICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aWNrLmJsYWNrYm9hcmQuc2V0KFwiaVwiLCBpLCB0aWNrLnRyZWUuaWQsIHRoaXMuaWQpO1xyXG4gICAgICAgIHJldHVybiBzdGF0dXM7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGlzIGFjdGlvbiBub2RlIHJldHVybnMgYEVSUk9SYCBhbHdheXMuXHJcbiAqXHJcbiAqIEBtb2R1bGUgYjNcclxuICogQGNsYXNzIEVycm9yXHJcbiAqIEBleHRlbmRzIEIzQWN0aW9uXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQjNFcnJvciBleHRlbmRzIEIzQWN0aW9uIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE5vZGUgbmFtZS4gRGVmYXVsdCB0byBgRXJyb3JgLlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIG5hbWUgPSBcIkVycm9yXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaWNrIG1ldGhvZC5cclxuICAgICAqIEBtZXRob2QgdGlja1xyXG4gICAgICogQHBhcmFtIHRpY2sgQSB0aWNrIGluc3RhbmNlLlxyXG4gICAgICogQHJldHVybiB7Q29uc3RhbnR9IEFsd2F5cyByZXR1cm4gYGIzLkVSUk9SYC5cclxuICAgICAqL1xyXG4gICAgdGljayh0aWNrOiBCM1RpY2spOiBCM1N0YXRlIHtcclxuICAgICAgICByZXR1cm4gYjMuRVJST1I7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGlzIGFjdGlvbiBub2RlIHJldHVybnMgYEZBSUxVUkVgIGFsd2F5cy5cclxuICpcclxuICogQG1vZHVsZSBiM1xyXG4gKiBAY2xhc3MgRmFpbGVyXHJcbiAqIEBleHRlbmRzIEIzQWN0aW9uXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQjNGYWlsZXIgZXh0ZW5kcyBCM0FjdGlvbiB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOb2RlIG5hbWUuIERlZmF1bHQgdG8gYEZhaWxlcmAuXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgbmFtZSA9IFwiRmFpbGVyXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaWNrIG1ldGhvZC5cclxuICAgICAqIEBtZXRob2QgdGlja1xyXG4gICAgICogQHBhcmFtIHRpY2sgQSB0aWNrIGluc3RhbmNlLlxyXG4gICAgICogQHJldHVybiB7Q29uc3RhbnR9IEFsd2F5cyByZXR1cm4gYGIzLkZBSUxVUkVgLlxyXG4gICAgICovXHJcbiAgICB0aWNrKHRpY2s6IEIzVGljayk6IEIzU3RhdGUge1xyXG4gICAgICAgIHJldHVybiBiMy5GQUlMVVJFO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogVGhpcyBhY3Rpb24gbm9kZSByZXR1cm5zIFJVTk5JTkcgYWx3YXlzLlxyXG4gKlxyXG4gKiBAbW9kdWxlIGIzXHJcbiAqIEBjbGFzcyBSdW5uZXJcclxuICogQGV4dGVuZHMgQjNBY3Rpb25cclxuICovXHJcbmV4cG9ydCBjbGFzcyBCM1J1bm5lciBleHRlbmRzIEIzQWN0aW9uIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE5vZGUgbmFtZS4gRGVmYXVsdCB0byBgUnVubmVyYC5cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBuYW1lID0gXCJSdW5uZXJcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRpY2sgbWV0aG9kLlxyXG4gICAgICogQG1ldGhvZCB0aWNrXHJcbiAgICAgKiBAcGFyYW0gdGljayBBIHRpY2sgaW5zdGFuY2UuXHJcbiAgICAgKiBAcmV0dXJuIHtDb25zdGFudH0gQWx3YXlzIHJldHVybiBgYjMuUlVOTklOR2AuXHJcbiAgICAgKi9cclxuICAgIHRpY2sodGljazogQjNUaWNrKTogQjNTdGF0ZSB7XHJcbiAgICAgICAgcmV0dXJuIGIzLlJVTk5JTkc7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGlzIGFjdGlvbiBub2RlIHJldHVybnMgYFNVQ0NFU1NgIGFsd2F5cy5cclxuICpcclxuICogQG1vZHVsZSBiM1xyXG4gKiBAY2xhc3MgU3VjY2VlZGVyXHJcbiAqIEBleHRlbmRzIEIzQWN0aW9uXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQjNTdWNjZWVkZXIgZXh0ZW5kcyBCM0FjdGlvbiB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOb2RlIG5hbWUuIERlZmF1bHQgdG8gYFN1Y2NlZWRlcmAuXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgbmFtZSA9IFwiU3VjY2VlZGVyXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaWNrIG1ldGhvZC5cclxuICAgICAqIEBtZXRob2QgdGlja1xyXG4gICAgICogQHBhcmFtIHRpY2sgQSB0aWNrIGluc3RhbmNlLlxyXG4gICAgICogQHJldHVybiB7Q29uc3RhbnR9IEFsd2F5cyByZXR1cm4gYGIzLlNVQ0NFU1NgLlxyXG4gICAgICovXHJcbiAgICB0aWNrKHRpY2s6IEIzVGljayk6IEIzU3RhdGUge1xyXG4gICAgICAgIHJldHVybiBiMy5TVUNDRVNTO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogV2FpdCBhIGZldyBzZWNvbmRzLlxyXG4gKlxyXG4gKiBAbW9kdWxlIGIzXHJcbiAqIEBjbGFzcyBXYWl0XHJcbiAqIEBleHRlbmRzIEIzQWN0aW9uXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQjNXYWl0IGV4dGVuZHMgQjNBY3Rpb24ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTm9kZSBuYW1lLiBEZWZhdWx0IHRvIGBXYWl0YC5cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBuYW1lID0gXCJXYWl0XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOb2RlIHRpdGxlLiBEZWZhdWx0IHRvIGBXYWl0IFhYbXNgLiBVc2VkIGluIEVkaXRvci5cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICB0aXRsZSA9IFwiV2FpdCA8bWlsbGlzZWNvbmRzPm1zXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOb2RlIHBhcmFtZXRlcnMuXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgcGFyYW1ldGVycyA9IHsgXCJtaWxsaXNlY29uZHNcIjogMCB9O1xyXG5cclxuICAgIGVuZFRpbWU6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemF0aW9uIG1ldGhvZC5cclxuICAgICAqXHJcbiAgICAgKiBTZXR0aW5ncyBwYXJhbWV0ZXJzOlxyXG4gICAgICpcclxuICAgICAqIC0gKiptaWxsaXNlY29uZHMqKiAoKkludGVnZXIqKSBNYXhpbXVtIHRpbWUsIGluIG1pbGxpc2Vjb25kcywgYSBjaGlsZFxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbiBleGVjdXRlLlxyXG4gICAgICpcclxuICAgICAqIEBtZXRob2QgaW5pdGlhbGl6ZVxyXG4gICAgICogQHBhcmFtIHNldHRpbmdzIE9iamVjdCB3aXRoIHBhcmFtZXRlcnMuXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioc2V0dGluZ3M/OiB7IG1pbGxpc2Vjb25kcz86IG51bWJlcjsgfSkge1xyXG4gICAgICAgIHNldHRpbmdzID0gc2V0dGluZ3MgfHwge307XHJcblxyXG4gICAgICAgIHN1cGVyKHNldHRpbmdzKTtcclxuICAgICAgICB0aGlzLmVuZFRpbWUgPSBzZXR0aW5ncy5taWxsaXNlY29uZHMgfHwgMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9wZW4gbWV0aG9kLlxyXG4gICAgICogQG1ldGhvZCBvcGVuXHJcbiAgICAgKiBAcGFyYW0gdGljayBBIHRpY2sgaW5zdGFuY2UuXHJcbiAgICAgKi9cclxuICAgIG9wZW4odGljazogQjNUaWNrKTogdm9pZCB7XHJcbiAgICAgICAgdmFyIHN0YXJ0VGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgdGljay5ibGFja2JvYXJkLnNldChcInN0YXJ0VGltZVwiLCBzdGFydFRpbWUsIHRpY2sudHJlZS5pZCwgdGhpcy5pZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaWNrIG1ldGhvZC5cclxuICAgICAqIEBtZXRob2QgdGlja1xyXG4gICAgICogQHBhcmFtIHRpY2sgQSB0aWNrIGluc3RhbmNlLlxyXG4gICAgICogQHJldHVybiB7Q29uc3RhbnR9IEEgc3RhdGUgY29uc3RhbnQuXHJcbiAgICAgKi9cclxuICAgIHRpY2sodGljazogQjNUaWNrKTogQjNTdGF0ZSB7XHJcbiAgICAgICAgdmFyIGN1cnJUaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcclxuICAgICAgICB2YXIgc3RhcnRUaW1lID0gdGljay5ibGFja2JvYXJkLmdldChcInN0YXJ0VGltZVwiLCB0aWNrLnRyZWUuaWQsIHRoaXMuaWQpO1xyXG5cclxuICAgICAgICBpZiAoY3VyclRpbWUgLSBzdGFydFRpbWUgPiB0aGlzLmVuZFRpbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGIzLlNVQ0NFU1M7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYjMuUlVOTklORztcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIOihjOS4uuagkXJ1bnRpbWVcclxuICogLSBodHRwczovL2dpdGh1Yi5jb20vYmVoYXZpb3IzL2JlaGF2aW9yM2pzXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBiMyB7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFZFUlNJT04gPSBcIjAuMi4wXCI7XHJcblxyXG4gICAgLy8gUmV0dXJuaW5nIHN0YXR1c1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBTVUNDRVNTID0gQjNTdGF0ZS5TVUNDRVNTO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBGQUlMVVJFID0gQjNTdGF0ZS5GQUlMVVJFO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBSVU5OSU5HID0gQjNTdGF0ZS5SVU5OSU5HO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBFUlJPUiA9IEIzU3RhdGUuRVJST1I7XHJcblxyXG4gICAgLy8gTm9kZSBjYXRlZ29yaWVzXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IENPTVBPU0lURSA9IFwiY29tcG9zaXRlXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IERFQ09SQVRPUiA9IFwiZGVjb3JhdG9yXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEFDVElPTiA9IFwiYWN0aW9uXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IENPTkRJVElPTiA9IFwiY29uZGl0aW9uXCI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBCZWhhdmlvclRyZWUgPSBCM0JlaGF2aW9yVHJlZTtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVGljayA9IEIzVGljaztcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgQmxhY2tib2FyZCA9IEIzQmxhY2tib2FyZDtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgQmFzZU5vZGUgPSBCM0Jhc2VOb2RlO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBBY3Rpb24gPSBCM0FjdGlvbjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgQ29tcG9zaXRlID0gQjNDb21wb3NpdGU7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IENvbmRpdGlvbiA9IEIzQ29uZGl0aW9uO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBEZWNvcmF0b3IgPSBCM0RlY29yYXRvcjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgTWVtUHJpb3JpdHkgPSBCM01lbVByaW9yaXR5O1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBNZW1TZXF1ZW5jZSA9IEIzTWVtU2VxdWVuY2U7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFByaW9yaXR5ID0gQjNQcmlvcml0eTtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgU2VxdWVuY2UgPSBCM1NlcXVlbmNlO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBJbnZlcnRlciA9IEIzSW52ZXJ0ZXI7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IExpbWl0ZXIgPSBCM0xpbWl0ZXI7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IE1heFRpbWUgPSBCM01heFRpbWU7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFJlcGVhdFVudGlsRmFpbHVyZSA9IEIzUmVwZWF0VW50aWxGYWlsdXJlO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBSZXBlYXRVbnRpbFN1Y2Nlc3MgPSBCM1JlcGVhdFVudGlsU3VjY2VzcztcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUmVwZWF0ZXIgPSBCM1JlcGVhdGVyO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBFcnJvciA9IEIzRXJyb3I7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEZhaWxlciA9IEIzRmFpbGVyO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBSdW5uZXIgPSBCM1J1bm5lcjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgU3VjY2VlZGVyID0gQjNTdWNjZWVkZXI7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFdhaXQgPSBCM1dhaXQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gY3JlYXRlIHVuaXF1ZSBJRHMgZm9yIHRyZWVzIGFuZCBub2Rlcy5cclxuICAgICAqIFxyXG4gICAgICogKGNvbnN1bHQgaHR0cDovL3d3dy5pZXRmLm9yZy9yZmMvcmZjNDEyMi50eHQpLlxyXG4gICAgICpcclxuICAgICAqIEBjbGFzcyBjcmVhdGVVVUlEXHJcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IEEgdW5pcXVlIElELlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZVVVSUQoKTogc3RyaW5nIHtcclxuICAgICAgICB2YXIgcyA9IFtdO1xyXG4gICAgICAgIHZhciBoZXhEaWdpdHMgPSBcIjAxMjM0NTY3ODlhYmNkZWZcIjtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM2OyBpKyspIHtcclxuICAgICAgICAgICAgc1tpXSA9IGhleERpZ2l0cy5zdWJzdHIoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMHgxMCksIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBiaXRzIDEyLTE1IG9mIHRoZSB0aW1lX2hpX2FuZF92ZXJzaW9uIGZpZWxkIHRvIDAwMTBcclxuICAgICAgICBzWzE0XSA9IFwiNFwiO1xyXG5cclxuICAgICAgICAvLyBiaXRzIDYtNyBvZiB0aGUgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZCB0byAwMVxyXG4gICAgICAgIHNbMTldID0gaGV4RGlnaXRzLnN1YnN0cigoc1sxOV0gJiAweDMpIHwgMHg4LCAxKTtcclxuXHJcbiAgICAgICAgc1s4XSA9IHNbMTNdID0gc1sxOF0gPSBzWzIzXSA9IFwiLVwiO1xyXG5cclxuICAgICAgICB2YXIgdXVpZCA9IHMuam9pbihcIlwiKTtcclxuICAgICAgICByZXR1cm4gdXVpZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsYXNzIGlzIGEgbWV0YS1mYWN0b3J5IGZ1bmN0aW9uIHRvIGNyZWF0ZSBjbGFzc2VzIGluIEphdmFTY3JpcHQuIEl0IGlzIGFcclxuICAgICAqIHNob3J0Y3V0IGZvciB0aGUgQ3JlYXRlSlMgc3ludGF4IHN0eWxlLiBCeSBkZWZhdWx0LCB0aGUgY2xhc3MgY3JlYXRlZCBieSBcclxuICAgICAqIHRoaXMgZnVuY3Rpb24gaGF2ZSBhbiBpbml0aWFsaXplIGZ1bmN0aW9uICh0aGUgY29uc3RydWN0b3IpLiBPcHRpb25hbGx5LCBcclxuICAgICAqIHlvdSBjYW4gc3BlY2lmeSB0aGUgaW5oZXJpdGFuY2UgYnkgcGFzc2luZyBhbm90aGVyIGNsYXNzIGFzIHBhcmFtZXRlci5cclxuICAgICAqIFxyXG4gICAgICogQnkgZGVmYXVsdCwgYWxsIGNsYXNzZXMgY3JlYXRlZCB1c2luZyB0aGlzIGZ1bmN0aW9uLCBtYXkgcmVjZWl2ZSBvbmx5IGFcclxuICAgICAqIGRpY3Rpb25hcnkgcGFyYW1ldGVyIGFzIGFyZ3VtZW50LiBUaGlzIHBhdHRlcm4gaXMgY29tbW9ubHkgdXNlZCBieSBqUXVlcnkgXHJcbiAgICAgKiBhbmQgaXRzIHBsdWdpbnMuXHJcbiAgICAgKlxyXG4gICAgICogU2luY2UgMC4yLjAsIENsYXNzIGFsc28gcmVjZWl2ZXMgYSBgcHJvcGVydGllc2AgcGFyYW1ldGVyLCBhIGRpY3Rpb25hcnlcclxuICAgICAqIHdoaWNoIHdpbGwgYmUgdXNlZCB0byBmaWxsIHRoZSBuZXcgY2xhc3MgcHJvdG90eXBlLlxyXG4gICAgICpcclxuICAgICAqIFVzYWdlXHJcbiAgICAgKiAtLS0tLVxyXG4gICAgICpcclxuICAgICAqICAgICAvLyBDcmVhdGluZyBhIHNpbXBsZSBjbGFzc1xyXG4gICAgICogICAgIHZhciBCYXNlQ2xhc3MgPSBiMy5DbGFzcygpO1xyXG4gICAgICpcclxuICAgICAqICAgICB2YXIgQ2hpbGRDbGFzcyA9IGIzLkNsYXNzKEJhc2VDbGFzcywge1xyXG4gICAgICogICAgICAgLy8gY29uc3RydWN0b3JcclxuICAgICAqICAgICAgIGluaXRpYWxpemUocGFyYW1zKSB7XHJcbiAgICAgKiAgICAgICBcclxuICAgICAqICAgICAgICAgLy8gY2FsbCBzdXBlciBpbml0aWFsaXplXHJcbiAgICAgKiAgICAgICAgIEJhc2VDbGFzcy5pbml0aWFsaXplLmNhbGwodGhpcywgcGFyYW1zKTtcclxuICAgICAqICAgICAgICAgLi4uXHJcbiAgICAgKiAgICAgICB9XHJcbiAgICAgKiAgICAgfSk7XHJcbiAgICAgKlxyXG4gICAgICogQGNsYXNzIENsYXNzXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYmFzZUNsYXNzIFRoZSBzdXBlciBjbGFzcy5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wZXJ0aWVzIEEgZGljdGlvbmFyeSB3aXRoIGF0dHJpYnV0ZXMgYW5kIG1ldGhvZHMuXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEEgbmV3IGNsYXNzLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIENsYXNzKGJhc2VDbGFzcywgcHJvcGVydGllcz8pOiAocGFyYW1zOiBhbnkpID0+IHZvaWQge1xyXG4gICAgICAgIC8vIGNyZWF0ZSBhIG5ldyBjbGFzc1xyXG4gICAgICAgIHZhciBjbHMgPSBmdW5jdGlvbiAocGFyYW1zKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZShwYXJhbXMgfHwge30pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIGlmIGJhc2UgY2xhc3MgaXMgcHJvdmlkZWQsIGluaGVyaXRcclxuICAgICAgICBpZiAoYmFzZUNsYXNzKSB7XHJcbiAgICAgICAgICAgIGNscy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKGJhc2VDbGFzcy5wcm90b3R5cGUpO1xyXG4gICAgICAgICAgICBjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIGluaXRpYWxpemUgaWYgZG9lcyBub3QgZXhpc3Qgb24gYmFzZUNsYXNzXHJcbiAgICAgICAgaWYgKCFjbHMucHJvdG90eXBlLmluaXRpYWxpemUpIHtcclxuICAgICAgICAgICAgY2xzLnByb3RvdHlwZS5pbml0aWFsaXplID0gZnVuY3Rpb24gKCkgeyB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY29weSBwcm9wZXJ0aWVzXHJcbiAgICAgICAgaWYgKHByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgICAgIGNscy5wcm90b3R5cGVba2V5XSA9IHByb3BlcnRpZXNba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNscztcclxuICAgIH1cclxufVxyXG4iXX0=