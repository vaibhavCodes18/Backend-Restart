import * as taskService from "../services/task.service.js"

export const createTask = async(req,res) => {
    try {
        return res.status(201).json({
          success: true,
          data: await taskService.createTask(req.body, req.params.projectId, req.user.id),
          message: "Task Created Successfully",
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
}

export const getAllTasksInsideProject = async(req, res) => {
  try {
        return res.status(200).json({
          success: true,
          data: await taskService.getAllTasksInsideProject(req.params.projectId),
          message: "All Tasks Fetched Successfully",
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
}
export const getTaskById = async(req, res) => {
  try {
        return res.status(200).json({
          success: true,
          data: await taskService.getTaskById(req.params.taskId),
          message: "Task Fetched Successfully",
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
}

export const updateTaskStatus = async(req, res) => {
  try {
        return res.status(200).json({
          success: true,
          data: await taskService.updateTaskStatus(req.params.taskId, req.body.status, req.user.id),
          message: "Task Status Updated Successfully",
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
}

export const assignToAnotherUser = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      data: await taskService.assignToAnotherUser(req.params.taskId, req.body.assigneeId, req.user.id),
      message: "Task Assigned to another user successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteTask = async(req, res) => {
  try {
    return res.status(200).json({
      success: true,
      data: await taskService.deleteTask(req.params.taskId, req.user.id),
      message: "Task Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

