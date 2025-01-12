import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification-list-item',
  standalone: true,
  imports: [],
  templateUrl: './notification-list-item.component.html',
  styleUrl: './notification-list-item.component.css'
})
export class NotificationListItemComponent {
  @Input() notification!: string;

  ngOnInit(): void {
    console.log("review item", this.notification);
  }
  
}
