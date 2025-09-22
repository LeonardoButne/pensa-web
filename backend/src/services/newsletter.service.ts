import { Newsletter } from '../domain/models/Newsletter';
import { Op } from 'sequelize';
import type { PaginationOptions, PaginationResult } from './disease.service';

interface SubscriptionResult {
  subscription?: Newsletter;
  alreadySubscribed?: boolean;
  reactivated?: boolean;
}

interface NewsletterGetAllOptions extends PaginationOptions {
  isActive?: boolean;
}

export class NewsletterService {
  static async subscribe(email: string): Promise<SubscriptionResult> {
    // Check if email already exists
    const existing = await Newsletter.findOne({
      where: { email },
    });

    if (existing) {
      if (existing.isActive) {
        return { alreadySubscribed: true };
      } else {
        // Reactivate subscription
        await existing.update({
          isActive: true,
          subscribedAt: new Date(),
          unsubscribedAt: null,
        });
        return { subscription: existing, reactivated: true };
      }
    }

    const newSubscription = await Newsletter.create({
      email,
      isActive: true,
      subscribedAt: new Date(),
    });

    return { subscription: newSubscription };
  }

  static async unsubscribe(email: string): Promise<boolean> {
    const [updatedRows] = await Newsletter.update(
      {
        isActive: false,
        unsubscribedAt: new Date(),
      },
      {
        where: { email, isActive: true },
      },
    );

    return updatedRows > 0;
  }

  static async findAllWithPagination(options: PaginationOptions): Promise<PaginationResult<Newsletter>> {
    const { page, limit, search } = options;
    const offset = (page - 1) * limit;

    const whereClause: any = {};
    if (search) {
      whereClause.email = { [Op.iLike]: `%${search}%` };
    }

    const { count, rows } = await Newsletter.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [['subscribedAt', 'DESC']],
    });

    return {
      data: rows,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    };
  }

  static async delete(id: number): Promise<boolean> {
    const deletedRows = await Newsletter.destroy({
      where: { id },
    });

    return deletedRows > 0;
  }

  static async getActiveSubscribers(): Promise<Newsletter[]> {
    return await Newsletter.findAll({
      where: { isActive: true },
      order: [['subscribedAt', 'DESC']],
    });
  }

  static async getSubscriberCount(): Promise<number> {
    return await Newsletter.count({
      where: { isActive: true },
    });
  }

  static async getAll(options: NewsletterGetAllOptions): Promise<PaginationResult<Newsletter>> {
    const { page, limit, search, isActive } = options;
    const offset = (page - 1) * limit;

    const whereClause: any = {};
    if (search) {
      whereClause.email = { [Op.iLike]: `%${search}%` };
    }
    if (isActive !== undefined) {
      whereClause.isActive = isActive;
    }

    const { count, rows } = await Newsletter.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [['subscribedAt', 'DESC']],
    });

    return {
      data: rows,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    };
  }

  static async getStats(): Promise<{
    totalSubscribers: number;
    activeSubscribers: number;
    inactiveSubscribers: number;
    recentSubscriptions: number;
  }> {
    const totalSubscribers = await Newsletter.count();
    const activeSubscribers = await Newsletter.count({ where: { isActive: true } });
    const inactiveSubscribers = totalSubscribers - activeSubscribers;

    // Recent subscriptions (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentSubscriptions = await Newsletter.count({
      where: {
        subscribedAt: { [Op.gte]: thirtyDaysAgo },
        isActive: true,
      },
    });

    return {
      totalSubscribers,
      activeSubscribers,
      inactiveSubscribers,
      recentSubscriptions,
    };
  }

  static async sendNewsletter(options: { subject: string; content: string }): Promise<void> {
    const { subject, content } = options;
    const activeSubscribers = await this.getActiveSubscribers();

    // Here you would integrate with an email service provider to send the emails.
    // For demonstration, we'll just log the emails to the console.

    for (const subscriber of activeSubscribers) {
      console.log(`Sending newsletter to ${subscriber.email}`);
      console.log(`Subject: ${subject}`);
      console.log(`Content: ${content}`);
      // Integrate with email service here...
    }
  }
}
