import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-concept-status-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './concept-status-item.component.html',
  styleUrl: './concept-status-item.component.css'
})
export class ConceptStatusItemComponent implements OnInit {
      @Input() status!: string;
      backgroundColor!: string;
      borderColor!: string;
      textColor!: string;
  
      ngOnInit(): void {
        console.log("status", this.status);
        this.setBackgroundAndBorderColor();
      }

      setBackgroundAndBorderColor() {
        if (this.status.toLocaleLowerCase() === 'concept') {
          this.backgroundColor = '#FFCF40';
          this.borderColor = '#BF9B30';
          this.textColor = this.borderColor;
        } else if (this.status.toLocaleLowerCase() === 'pending') {
          this.backgroundColor = '#77CCFF';
          this.borderColor = '#3388FF';
          this.textColor = this.borderColor;
        } else {
          this.backgroundColor = '#FF7F78';
          this.borderColor = '#FF3126';
          this.textColor = this.borderColor;
        }
      }
}
