import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Filter } from '../../../shared/models/Filter.model';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  filter: Filter = {content: '', author: "", date: new Date() };

  @Output() filterChanged = new EventEmitter<Filter>();

  onSubmit(form: any) {
    if (form.valid) {
      this.filter.content = form.value.content;
      this.filter.author = form.value.author;
      this.filter.date = form.value.date;
      this.filterChanged.emit(this.filter);
    }
  }
}
