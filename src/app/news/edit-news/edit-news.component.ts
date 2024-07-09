import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {Article, NewsControllerService} from "../../openapi";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NgIf} from "@angular/common";
import {NewsService} from "../../service/news.service";

@Component({
  selector: 'app-edit-news',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './edit-news.component.html',
  styleUrl: './edit-news.component.css'
})
export class EditNewsComponent implements OnInit {
  @Input() newsEdit!: Article;

  editForm: FormGroup = new FormGroup({
    id: new FormControl({value: '', disabled: true}, [Validators.required, Validators.min(1)]),
    title: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
    image_url: new FormControl('', Validators.required),
    summary: new FormControl('', Validators.required),
    news_site: new FormControl('', Validators.required),
    published_at: new FormControl('', Validators.required)
  })

  modalService: NgbModal = new NgbModal();

  get editFormControl() {
    return this.editForm.controls;
  }

  constructor(private newsControllerService: NewsControllerService, private newsService: NewsService) {
  }

  editNews() {
    this.editForm.get('id')?.enable();
    let article = Object.assign(this.editForm.value) as Article;
    console.log(article);

    this.newsControllerService.editArticle(article).subscribe((result) => {
      this.ngOnInit();
    })

    this.editForm.reset();
    this.modalService.dismissAll();
  }

  openEdit(contentEditCar: TemplateRef<Article>) {
    console.log("News id: ", this.newsEdit.id);
    this.modalService.open(contentEditCar, {
      centered: true,
      backdrop: 'static',
      size: 'lg',
    });

    document.getElementById("id")!.setAttribute('value', String(this.newsEdit.id));
    document.getElementById('save-btn')!.addEventListener('click', (e) => {
     this.newsService.getAllNews();
    });

    this.editForm.patchValue({
      id: String(this.newsEdit.id),
      title: this.newsEdit.title,
      url: this.newsEdit.url,
      image_url: this.newsEdit.image_url,
      summary: this.newsEdit.summary,
      news_site: this.newsEdit.news_site,
      published_at: this.newsEdit.published_at
    });
  }

  ngOnInit(): void {
  }
}
