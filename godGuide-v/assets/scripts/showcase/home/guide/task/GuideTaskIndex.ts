
/**获取任务入口文件 */

import guideTask1 from "./GuideTask1"
import guideTask2 from "./GuideTask2"

export interface IGuideTask {
    task: any
}

const guideTasks: Record<string, IGuideTask> = {
    guideTask1,
    guideTask2,
}

export default guideTasks