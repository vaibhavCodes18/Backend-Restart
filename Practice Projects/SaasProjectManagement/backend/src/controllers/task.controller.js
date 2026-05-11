import * as taskService from "../services/task.service.js"

export const createTask = async(req,res) => {
    try {
        return res.status(201).json({
          success: true,
          data: await taskService.createTask(req.body, req.params.projectId),
          message: "Task Created Successfully",
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    
}