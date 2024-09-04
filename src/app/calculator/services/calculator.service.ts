import { Injectable, signal } from '@angular/core';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operator = ['+', '-', '*', '/', '÷', 'x']
const specialOperators = ['C', '+/-', '%', '=', 'Backspace', '.'];

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  public resultText = signal('0');
  public subResultText = signal('10');
  public lastOperator = signal('+');

  public constructNumber(value: string) {
    //?Validate the input
    if (![...numbers, ...operator, ...specialOperators].includes(value)) {
      console.log('Invalid input', value);
      return;
    }

    //? Verify if = was pressed
    if (value === '=') {
      // console.log('Calculate result');
      this.calculateResult();
      return;
    }

    //? Check if clear 'C' was pressed
    if (value === 'C') {
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');
    }

    //? Check backspace
    //TODO: Check for negative values
    if (value === 'Backspace') {
      // TODO:
      if (this.resultText() === '0') return;
      // if (this.resultText().length === 1) {
      //   this.resultText.set('0');
      //   return;
      // }
      if (this.resultText().includes('-') && this.resultText().length === 2){
        this.resultText.set('0');
        return;
      }

      if(this.resultText().length === 1){
        this.resultText.set('0');
        return;
      }

      //? Delete last entry
      this.resultText.update((prev) => prev.slice(0, -1));
      return;
    }

    //? Check for the operator
    if (operator.includes(value)) {
      this.calculateResult();

      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return;
    }

    //? Limit the number of characters
    if (this.resultText().length >= 10) {
      console.log('Limit reached');
      return;
    }

    //? Check for the decimal value
    if (value === '.' && !this.resultText().includes('.')) {
      //Check for 0.
      if (this.resultText() === '0' || this.resultText() === '') {
        this.resultText.set('0.');
        return;
      }
      //? Update number
      this.resultText.update((prev) => prev + '.');
      return;
    }

    //? Handle initial 0 in Calculator
    if (
      value === '0' &&
      (this.resultText() === '0' || this.resultText() === '-0')
    ) {
      return;
    }

    //? Change the symbol + or -
    if (value === '+/-') {
      if (this.resultText().includes('-')) {
        this.resultText.update((prev) => prev.slice(1));
        return;
      }

      this.resultText.update((prev) => '-' + prev);
      return;
    }

    //? Concatenate the entry
    if (numbers.includes(value)) {
      if (this.resultText() === '0') {
        this.resultText.set(value);
        return;
      }

      if (this.resultText() === '-0') {
        this.resultText.set('-' + value);
        return;
      }
      this.resultText.update((prev) => prev + value);
      return;
    }
  }

  public calculateResult() {
    const number1 = parseFloat(this.subResultText());
    const number2 = parseFloat(this.resultText());

    const operations: { [key: string]: (a: number, b: number) => number } = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      '*': (a, b) => a * b,
      'x': (a, b) => a * b,
      '/': (a, b) => (b !== 0 ? a / b : 0), // handle division by zero
      '÷': (a, b) => (b !== 0 ? a / b : 0), // handle division by zero
    };

    const operator = this.lastOperator();
  

    if (operator in operations) {
      const result = operations[operator](number1, number2);
      this.resultText.set(result.toString());
      this.subResultText.set('0');
      return;

    } 
      this.resultText.set('Invalid operation');
  }

}
