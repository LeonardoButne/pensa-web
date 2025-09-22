package com.pensa.api.dto;

public class UserStatsDto {
    private long totalUsers;
    private long activeUsers;
    private long inactiveUsers;
    private long admins;
    private long superAdmins;
    
    // Getters and Setters
    public long getTotalUsers() { return totalUsers; }
    public void setTotalUsers(long totalUsers) { this.totalUsers = totalUsers; }
    
    public long getActiveUsers() { return activeUsers; }
    public void setActiveUsers(long activeUsers) { this.activeUsers = activeUsers; }
    
    public long getInactiveUsers() { return inactiveUsers; }
    public void setInactiveUsers(long inactiveUsers) { this.inactiveUsers = inactiveUsers; }
    
    public long getAdmins() { return admins; }
    public void setAdmins(long admins) { this.admins = admins; }
    
    public long getSuperAdmins() { return superAdmins; }
    public void setSuperAdmins(long superAdmins) { this.superAdmins = superAdmins; }
}
