import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HomeComponent } from "./home.component";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BookService } from "src/app/services/book.service";
import { Book } from "src/app/models/book.model";
import { of } from "rxjs";

const listBook: Book[] = []

const bookServiceMock = {
  getBooks: () => of(listBook),
}

@Pipe({name:'reduceText'})
class ReduceTextPipeMock implements PipeTransform{
  transform(): string{
    return '';
  }
}

//Si se pone f al principio solo se ejecutan los tests de ese componente  (fdescribe)
/* f */describe('Home Component', () => {
  let component: HomeComponent;
  let fixtre: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        HomeComponent,
        ReduceTextPipeMock
      ],
      providers: [
        //BookService
        {
          provide: BookService,
          useValue: bookServiceMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixtre = TestBed.createComponent(HomeComponent);
    component = fixtre.componentInstance;
    fixtre.detectChanges();
  });

  //Al principio de todos los tests, solo una vez
  beforeAll(() => {});

  //Despues de cada test
  afterEach(() => {});

  //Cuando terminan todos los tests
  afterAll(() => {});

  //X para anular tests
  /* x */it('should create',() => {
    expect(component).toBeTruthy()
  });


  /* public getBooks(): void {
    this.bookService.getBooks().pipe(take(1)).subscribe((resp: Book[]) => {
      this.listBook = resp;
    });
  } */

  //Si le pones f delante solo se ejecutan los tests con la f (fit)
  /*f*/it('getBook get books from subscription', () => {
    const bookService = fixtre.debugElement.injector.get(BookService);


    //const spy1 = spyOn(bookService, 'getBooks').and.returnValue(of(listBook));


    component.getBooks();

    //expect(spy1).toHaveBeenCalled();
    expect(component.listBook.length).toBe(0);
  });

});
