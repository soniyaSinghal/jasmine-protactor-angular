import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { LoginComponent } from './login.component';
import { MockAuthenticationService } from 'src/app/tests/mocks/services/mock-service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: AuthenticationService, useClass: MockAuthenticationService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component = null;
  });

  it('should create loginComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should not show loader on component init', () => {
    expect(component.loading).toBe(false);
  });

  it('should contain a default value for the login form', () => {
    expect(component.loginForm.value).toEqual({ username: '', password: '' });
  });

  it('should set values when component is initialized', () => {
    //action
    fixture.detectChanges();
    component.ngOnInit();

    expect(component.loading).toBe(false);
    expect(component.submitted).toBe(false);
    expect(component.loginForm.value).toEqual({ username: '', password: '' });
  });

  it('should check if form is valid and login user and navigate to dashboard ', () => {
    component.loginForm.setValue({ username: 'test', password: 'test@123' });
    spyOn(component.router, 'navigate');

    component.onSubmit();
    component.router.navigate(['dashboard']);
    expect(component.loading).toBe(false);
    expect(component.router.navigate).toHaveBeenCalled();
    expect(component.router.navigate).toHaveBeenCalledWith(jasmine.any(Array));
    expect(component.router.navigate).toHaveBeenCalledWith(
      jasmine.arrayContaining(['dashboard'])
    );
  });

  it('should not call login if form is not valid ', () => {
    component.loginForm.setValue({ username: 'test', password: 'test123' });
    spyOn(component.router, 'navigate');

    component.onSubmit();
    expect(component.router.navigate).not.toHaveBeenCalled();
  });

  it('should call onLoginFailure when server returns error ', () => {
    component.loginForm.setValue({
      username: 'sendError',
      password: 'test123',
    });
    spyOn(component.router, 'navigate');
    spyOn(component, 'onLoginFailure');
    spyOn(component.loginForm, 'reset');

    component.onSubmit();
    expect(component.router.navigate).not.toHaveBeenCalled();
    expect(component.onLoginFailure).toHaveBeenCalled();
    expect(component.loginForm.reset).toHaveBeenCalled();
    expect(component.loading).toBe(false);
  });
});
