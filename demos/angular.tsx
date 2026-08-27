import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from "@angular/router";
import { catchError, of, switchMap } from "rxjs";
import { Person, SearchService } from "../shared";

@Component({
  selector: "app-search",
  template: `
    <label>
      Search
      <input #term [value]="query()" (input)="search(term.value)" />
    </label>

    @for (person of results(); track person.id) {
      <p>{{ person.name }}</p>
    } @empty {
      <p>No results</p>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  readonly #route = inject(ActivatedRoute);
  readonly #searchService = inject(SearchService);
  readonly query = signal(this.#route.snapshot.paramMap.get("term") ?? "");

  readonly results = toSignal(
    toObservable(this.query).pipe(
      switchMap((term) => this.#searchService.search(term)),
      catchError((error: unknown) => {
        console.error(error);
        return of([] satisfies Person[]);
      }),
    ),
    { initialValue: [] as Person[] },
  );

  search(term: string): void {
    this.query.set(term.trim());
  }
}
