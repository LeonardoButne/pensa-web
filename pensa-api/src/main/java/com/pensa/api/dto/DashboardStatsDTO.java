package com.pensa.api.dto;

public class DashboardStatsDTO {
    private Integer activeUsersCount;
    private Long newsletterSubscriptionsCount;
    private Long unreadMessagesCount;
    
    // Constructors, getters, setters
    public DashboardStatsDTO() {}
    
    public Integer getActiveUsersCount() { return activeUsersCount; }
    public void setActiveUsersCount(Integer activeUsersCount) { this.activeUsersCount = activeUsersCount; }
    
    public Long getNewsletterSubscriptionsCount() { return newsletterSubscriptionsCount; }
    public void setNewsletterSubscriptionsCount(Long newsletterSubscriptionsCount) { this.newsletterSubscriptionsCount = newsletterSubscriptionsCount; }
    
    public Long getUnreadMessagesCount() { return unreadMessagesCount; }
    public void setUnreadMessagesCount(Long unreadMessagesCount) { this.unreadMessagesCount = unreadMessagesCount; }
}