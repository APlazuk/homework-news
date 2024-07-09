import {Component, OnInit} from '@angular/core';
import {Article} from "../openapi";
import {EditNewsComponent} from "./edit-news/edit-news.component";
import {NgForOf} from "@angular/common";
import {NewsService} from "../service/news.service";

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    EditNewsComponent,
    NgForOf
  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit {

  latestNews: Array<Article> = [];

  constructor(private newsService: NewsService) {
  }

  ngOnInit(): void {
    this.newsService.getAllNews();
    this.updateLatestNews();
  }

  private updateLatestNews() {
    this.newsService.currentLatestNews
      .subscribe(latestArticles => {
        this.latestNews = latestArticles;
      });
    console.log(this.latestNews)
  }
}
