import { Pipe, PipeTransform } from "@angular/core";
import { of } from "rxjs";

export class TranslateServiceStub{
	public get(key: any): any {
		return of(key);
	}

  public instant(key: any): any {
		return of(key);
	}
}

@Pipe({
  name: "translate"
})
export class MockTranslatePipe implements PipeTransform {
  public name: string = "translate";

  public transform(query: string, ..._args: any[]): any {
      return query;
  }
}

@Pipe({
  name: 'date',
  pure: false
})
export class MockDatePipe implements PipeTransform {
  public name: string = 'date';

  public transform(_value: any, ..._args: any[]) {
    return '';
  }
}
