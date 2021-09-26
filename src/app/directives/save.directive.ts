import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { ProductWithPhoto } from '../dto/product/productWithPhoto';
import { Save } from '../dto/save/save';
import { User } from '../dto/user/user';
import { SaveService } from '../services/save.service';
import { UserStorageService } from '../services/user-storage.service';

@Directive({
  selector: '[appSave]'
})
export class SaveDirective implements OnInit {

  user: User;
  save: Save = new Save();
  saved: boolean = false;

  @Input()
  product: ProductWithPhoto;

  constructor(
    private elementRef: ElementRef,
    private saveService: SaveService,
    private userStorageService: UserStorageService
  ) { }


  ngOnInit(): void {
    this.user = this.userStorageService.getUser();

    if (this.user.id===this.product.user.id) {
      // this.elementRef.nativeElement.style.display = 'none';
      this.elementRef.nativeElement.style.backgroundColor = '#919191';
      this.elementRef.nativeElement.innerText = "My Product";
    }else {
      this.isSaved();
    }
  }

  isSaved() {
    this.save.product = this.product;
    this.save.user = this.user;
  
    this.saveService.isSaved(this.save).subscribe(
      (res)=>{
        this.save = res;
        this.saved = true;
        this.setStyle();
      },
      (err)=>{
        this.saved = false;
        this.setStyle();
      }
    );
  }

  setStyle() {
    if (this.saved) {
      this.elementRef.nativeElement.style.backgroundColor = '#eb4034';
      this.elementRef.nativeElement.innerText = "Forget";
    }else {
      this.elementRef.nativeElement.style.backgroundColor = '#00a3cc';
      this.elementRef.nativeElement.innerText = "Save";
    }
  }

  @HostListener('click')
  saveOrForget() {
    if (this.user.id!==this.product.user.id) {
      if (this.saved) {
        this.forget();
      }else {
        this.addSave();
      }
    }
  }

  addSave() {
    this.save.product = this.product;
    this.save.user = this.user;
    
    this.saveService.save(this.save).subscribe(
      (res)=>{
        this.isSaved();
      }
    )
    
  }

  forget() {
    this.saveService.forget(this.save.id).subscribe(
      (res)=>{
        this.isSaved();
      },
      (err)=>{
        console.error("Product not forgoten. " + err);
      }
    )
  }

}
