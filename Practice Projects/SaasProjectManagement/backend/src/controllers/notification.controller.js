import * as notificationService from "../services/notification.service.js";

export const getNotification = async(req, res) => {
  return res.json({
    message:"Notifications fetched successfully",
    data: await notificationService.getNotifications(req.user.id)
  })  
}

export const markNotificationAsRead = async(req, res) => {
  return res.json({
    message:"Notification marked as read successfully",
    data: await notificationService.markAsRead(req.params.notificationId)
  })  
}