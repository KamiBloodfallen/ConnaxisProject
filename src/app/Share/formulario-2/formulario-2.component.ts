import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

interface SmallCard {
  id: number;
  content: string;
}

@Component({
  selector: 'app-formulario-2',
  standalone: true,
  imports: [],
  templateUrl: './formulario-2.component.html',
  styleUrl: './formulario-2.component.css'
})
export class Formulario2Component {
  options = ['Option 1', 'Option 2', 'Option 3'];
  smallCards: SmallCard[] = [];
  private nextId = 0;

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      selectedOption: [null]
    });
  }

  addCard() {
    const selectedOption = this.form.get('selectedOption')?.value;
    if (selectedOption) {
      const newCard: SmallCard = {
        id: this.nextId++,
        content: selectedOption
      };
      this.smallCards.push(newCard);
      this.form.get('selectedOption')?.reset();
    }
  }

  removeCard(id: number) {
    this.smallCards = this.smallCards.filter(card => card.id !== id);
  }
}
