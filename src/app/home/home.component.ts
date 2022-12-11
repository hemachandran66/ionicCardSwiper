import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { GestureController, IonCard, Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  @ViewChildren(IonCard, { read: ElementRef })
  cards!: QueryList<ElementRef>;
  cardArray!: Array<ElementRef>;
  moveOutWidth: any;
  message: string | undefined;
  constructor(private gestureCtrl: GestureController, private plt: Platform, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.moveOutWidth = document.documentElement.clientWidth * 1.5;
    this.cardArray = this.cards?.toArray();
    this.cards.changes.subscribe(() => {
      this.cardArray = this.cards.toArray();
    })
    this.longPress(this.cardArray)
  
  }
  interested: any;
  longPress(cardArray: any) {
    for (var i = 0; i < cardArray.length; i++) {
      const card = cardArray[i];
      console.log('card: ', card);

      const gesture = this.gestureCtrl.create({
        el: card.nativeElement,
        gestureName: 'swiper',
        onStart: ev => {

        },
        onMove: ev => {
          card.nativeElement.style.transform = `translatex(${ev.deltaX}px) rotate(${ev.deltaX / 10}deg)`
        },
        onEnd: ev => {
          card.nativeElement.style.transition = '.5s ease-out';
          if (ev.deltaX > 150) {
            card.nativeElement.style.transform = `translateX(${+this.plt.width() * 2}px) rotate(${ev.deltaX / 2}deg)`
          }
          else if (ev.deltaX < -150) {
            card.nativeElement.style.transform = `translateX(-${+this.plt.width() * 2}px) rotate(${ev.deltaX / 2}deg)`;
          }
          else {
            card.nativeElement.style.transform = '';
          }
        }
      });
      gesture.enable(true);
    }
  }
  notInterested(i: any) {
    this.cardArray[i].nativeElement.style.transform = 'translate(-' + this.moveOutWidth + 'px, -100px) rotate(-30deg)';
  }
  Interested(i: any) {
    this.cardArray[i].nativeElement.style.transform = 'translate(' + this.moveOutWidth + 'px, -100px) rotate(30deg)';
    this.interestedFunc();
  }
  interestedFunc() {
    this.interested = true;
    setTimeout(() => {
      this.interested = false;
    }, 3000);
  }
  profile = [{
    name: 'Salman',
    age: 26,
    height: "5'11",
    city: "Chennai",
    id: "M68765",
    profession: "Business",
    img: "../assets/images/dq.jpg"
  },
  {
    name: 'Virat',
    age: 28,
    height: "5'2",
    city: "Madurai",
    id: "M68705",
    profession: "Model",
    img: "../assets/images/Virat_Kohli.jpg"
  },
  {
    name: 'Chandler Bing',
    age: 32,
    height: "5'6",
    city: "United States of America",
    id: "M48362",
    profession: "Civil",
    img: "../assets/images/chandler.jpeg"
  },
  {
    name: 'Hemanth',
    age: 24,
    height: "6'2",
    city: "Chennai",
    id: "M58762",
    profession: "Developer",
    img: "../assets/images/ani.jpg",
    about:"I am working as a frontend developer at a reputed company and looking for a bride at the same field. No issue with the religion or community"
  },
  {
    name: 'Jeeva',
    age: 30,
    height: "5'11",
    city: "Hyderabad",
    id: "M289056",
    profession: "Banking",
    img: "../assets/images/jeeva.png",
    about:"I am working as a cashier at DBS bank. Any community is fine for me and wish for graduated bride"
  },
  {
    name: 'Karthick',
    age: 27,
    height: "5'11",
    city: "Bangalore",
    id: "M187656",
    profession: "Doctor",
    img: "../assets/images/karthick.jpg",
    about:"Myself Karthick working at Appolo Hospital as chief doctor looking for a same profession girl"
  }
  ]
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
