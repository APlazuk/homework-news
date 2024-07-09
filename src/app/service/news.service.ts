import {Injectable} from '@angular/core';
import {Article, NewsControllerService} from "../openapi";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private newsSource: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([]);
  currentLatestNews = this.newsSource.asObservable();

  constructor(private newsControllerService: NewsControllerService) {
  }

  changeNews(news: Array<Article>) {
    this.newsSource.next(news);
  }

  public getAllNews(): void {
    this.newsControllerService.findAll()
      .subscribe({
        next: response => this.changeNews(response),
        error: err => console.log(err)
      })
  }


}
