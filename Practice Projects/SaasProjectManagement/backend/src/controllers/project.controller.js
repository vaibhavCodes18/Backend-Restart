import * as projectService from "../services/project.service.js"

export const createProject = async(req,res)=>{
    try {
        const project = await projectService.createProject(req.body, req.params.workspaceId);
        return res.status(201).json({
            success: true,
            data: project,
            message: "Project created successfully."
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

export const getAllProjectsInsideWorkspace = async (req, res) => {
  return res.status(200).json({
    success: true,
    data: await projectService.getAllProjectsInsideWorkspace(req.user.id, req.params.workspaceId),
    message: "All Projects Inside Workspace Fetched Successfully",
  });
};

export const getProjectDetail = async(req,res)=>{
    try {
        const project = await projectService.getProjectDetail(req.params.projectId);
        return res.status(200).json({
            success: true,
            data: project,
            message: "Project fetched successfully.",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

export const updateProject = async(req,res)=>{
    try {
        const project = await projectService.updateProject(req.body, req.params.workspaceId, req.params.projectId);
        return res.status(200).json({
            success: true,
            data: project,
            message: "Project updated successfully.",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}
    
export const deleteProject = async(req,res)=>{
    try {
        await projectService.deleteProject(req.params.workspaceId, req.params.projectId);
        return res.status(200).json({
            success: true,
            data: true,
            message: "Project deleted successfully.",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}
