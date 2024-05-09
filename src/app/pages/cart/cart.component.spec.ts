import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CartComponent } from "./cart.component";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BookService } from "src/app/services/book.service";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { Book } from "src/app/models/book.model";

const listBook: Book[] = [
  {
    name: "Padre rico padre pobre",
    author: "Xi",
    isbn: "1234",
    price: 15,
    amount: 2
  },
  {
    name: "Padre",
    author: "Xi",
    isbn: "12342",
    price: 14,
    amount:2
  },
];

describe('Cart component',() => {

  //Componente a testear
  let component: CartComponent;
  //Variable para extraer cosas del componente, como el servicio
  let fixture: ComponentFixture<CartComponent>

  let service: BookService

  //Se ejecuta antes de cada test
  beforeEach(() => {

    TestBed.configureTestingModule({

      //
      imports: [
        HttpClientTestingModule
      ],
      //Componente que usamos en el test
      declarations: [
        CartComponent
      ],
      //Servicios que utiliza el componente, que estan en el constructor
      providers: [
        BookService,
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();

  });

  //Instanciar componente
  beforeEach(() => {

    fixture = TestBed.createComponent(CartComponent)
    component = fixture.componentInstance;
    fixture.detectChanges()
    service = fixture.debugElement.injector.get(BookService);

  });

  it('should create', () => {
    expect(component).toBeTruthy(); //Esperar a que el componente esté instanciado
  });


  /* public onClearBooks(): void {
    if (this.listCartBook && this.listCartBook.length > 0) {
      this._clearListCartBook();
    } else {
       console.log("No books available");
    }
  } */

  it('getTotalPrice', () => {
    const totalPrice = component.getTotalPrice(listBook);
    //expect(totalPrice).toBeGreaterThan(0);
    expect(totalPrice).not.toBe(0);
    expect(totalPrice).not.toBeNull();
  });


  /* public onInputNumberChange(action: string, book: Book): void {
    const amount = action === 'plus' ? book.amount + 1 : book.amount - 1;
    book.amount = Number(amount);
    this.listCartBook = this._bookService.updateAmountBook(book);
    this.totalPrice = this.getTotalPrice(this.listCartBook);
  } */

  it('onInputNumberChange increments correctly', () => {
    const action = 'plus';
    const book = listBook[0];

    //Declarar Servicio
    //const service = fixture.debugElement.injector.get(BookService);

    const spy1 = spyOn(service, "updateAmountBook").and.callFake(() => null);
    const spy2 = spyOn(component, 'getTotalPrice').and.callFake(() => null);

    expect(book.amount).toBe(2);

    //Esto hace una llamada real, lo cual no debería, por eso se usa el callFake en el spy
    component.onInputNumberChange(action, book);

    expect(book.amount).toBe(3);

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();

  });

  it('onInputNumberChange decrements correctly', () => {
    const action = 'minus';
    const book = listBook[1];

    //Declarar Servicio
    //const service = fixture.debugElement.injector.get(BookService);

    expect(book.amount).toBe(2);

    const spy1 = spyOn(service, "updateAmountBook").and.callFake(() => null);
    const spy2 = spyOn(component, 'getTotalPrice').and.callFake(() => null);

    //Esto hace una llamada real, lo cual no debería, por eso se usa el callFake en el spy
    component.onInputNumberChange(action, book);

    expect(book.amount).toBe(1);

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();

  });

  /* public onClearBooks(): void {
    if (this.listCartBook && this.listCartBook.length > 0) {
      this._clearListCartBook();
    } else {
       console.log("No books available");
    }
  }

  private _clearListCartBook() {
    this.listCartBook = [];
    this._bookService.removeBooksFromCart();
  } */

  //Probar métodos privados
  it('onClearBooks works correct', () => {

    //Forma de acceder al metodo privado para crear el espia  //Se va a llamar al metodo
    const spy1 = spyOn((component as any), '_clearListCartBook').and.callThrough();
    const spy2 = spyOn(service, 'removeBooksFromCart').and.callFake(() => null);

    component.listCartBook = listBook;

    component.onClearBooks();

    expect(component.listCartBook.length).toBe(0);
    expect(component.listCartBook.length === 0).toBeTrue();
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();

  });

  //Mejor de la forma de arriba
  /* it('_clearListCartBook works correctly', () => {
    const spy1 = spyOn(service, 'removeBooksFromCart').and.callFake(() => null);

    component.listCartBook = listBook;

    component["_clearListCartBook"]();

    expect(component.listCartBook.length).toBe(0);
    expect(spy1).toHaveBeenCalled();

  }); */

});
