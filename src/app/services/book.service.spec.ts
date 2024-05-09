import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { BookService } from "./book.service";
import { TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { Book } from "../models/book.model";
import { environment } from "src/environments/environment";
import swal from 'sweetalert2';

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

const book: Book = {
  name: "Padre rico padre pobre",
  author: "Xi",
  isbn: "1234",
  price: 15,
  amount: 2
}

fdescribe('BookService',() => {

  let service: BookService;
  let httpMock: HttpTestingController;
  let storage = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        BookService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController)



    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return storage[key] ? storage[key] : null;
    });

    spyOn(localStorage, 'setItem').and.callFake((key:string, value:string) => {
      return storage[key] = value;
    })
  });

  afterEach(() => {
    httpMock.verify(); //Hace que no hayan peticiones pendientes entre cada test
  });

  it('shold created', () => {
    expect(service).toBeTruthy();
  });

  it('getBook return alist of book and does a get method', () => {
    service.getBooks().subscribe((resp: Book[]) => {
      expect(resp).toEqual(listBook); //Probando que sea del tipo adecuado la respuesta
    });

    const req = httpMock.expectOne(environment.API_REST_URL + `/book`)

    //El test espera que el metodo de req sea de tipo GET
    expect(req.request.method).toBe('GET');
    req.flush(listBook); //Simular que la peticion se ha hecho y devuelve un observable
  });


  /* public getBooksFromCart(): Book[] {
    let listBook: Book[] = JSON.parse(localStorage.getItem('listCartBook'));
    if (listBook === null) {
      listBook = [];
    }
    return listBook;
  } */

  it('getBooksFromCart retrun empty when localStorage is empty',() => {
    const listBook = service.getBooksFromCart();

    expect(listBook.length).toBe(0);
  });

  it('addBookToCart add a book succesfully when the list does not exist in the localStorage', () => {

    const toast = {
      fire: () => null
    } as any;

    const spy1 = spyOn(swal, 'mixin').and.callFake(() => {
      return toast;
    })

    let listBook = service.getBooksFromCart();

    expect(listBook.length).toBe(0);

    service.addBookToCart(book);
    listBook = service.getBooksFromCart();

    expect(listBook.length).toBe(1);

    expect(spy1).toHaveBeenCalled();
  });

});
