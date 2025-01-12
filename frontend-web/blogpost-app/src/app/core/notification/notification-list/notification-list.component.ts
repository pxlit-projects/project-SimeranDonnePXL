import { Component, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationService } from '../../../shared/services/notification.service';
import { NotificationListItemComponent } from '../notification-list-item/notification-list-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification-list',
  standalone: true,
  imports: [NotificationListItemComponent, CommonModule],
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.css'
})
export class NotificationListComponent {
    private filteredDataSubject = new BehaviorSubject<string[]>([]);
    filteredData$: Observable<string[]> = this.filteredDataSubject.asObservable();
  
    notificationService : NotificationService = inject(NotificationService);
  
    ngOnInit(): void {
      this.fetchData();
    }
  
    fetchData(): void {
      this.notificationService.getNotifications().subscribe({
        next: (notification: string[]) => {
          this.filteredDataSubject.next(notification);
  
          console.log("the notification", notification);
          console.log("the list", this.filteredDataSubject);
        }
      });
    }
}
