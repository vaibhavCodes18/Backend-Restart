import * as projectService from "../services/project.service.js"

export const createProject = async(req,res)=>{
    try {
        const project = await projectService.createProject(req.body);
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
    