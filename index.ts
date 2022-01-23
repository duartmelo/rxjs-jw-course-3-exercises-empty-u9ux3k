import { Observable } from 'rxjs';

const observable$ = new Observable<string>((subscriber) => {
  console.log('Observable executed');
  subscriber.next('TEST');
  subscriber.next('TEST2');
  setTimeout(() => {
    subscriber.error('Failure');
  }, 2000);
  setTimeout(() => {
    subscriber.next('TEST3');
    subscriber.complete();
  }, 4000);

  return () => {
    console.log('TeardownLogic');
  };
});

console.log('Before Subscription');
const subscription = observable$.subscribe({
  next: (value) => console.log(value),
  error: (error) => console.log(error),
  complete: () => console.log('complete'),
});
console.log('After Subscription');

subscription.unsubscribe();
