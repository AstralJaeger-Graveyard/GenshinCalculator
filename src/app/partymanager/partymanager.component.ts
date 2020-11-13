import {Component, OnInit} from '@angular/core';
import {Element} from '../model/Element';
import {Character} from '../model/Character';
import {PartyCharacter} from '../model/PartyCharacter';

@Component({
  selector: 'app-partymanager',
  templateUrl: './partymanager.component.html',
  styleUrls: ['./partymanager.component.css']
})
export class PartymanagerComponent implements OnInit {

  keqing = new Character('Keqing', 'The Yuheng of the Liyue Qixing. Has much to say about Rex Lapis\' unilateral approach to policymaking in Liyue - but in truth, gods admire skeptics such as her quite a lot.', Element.Electro, 5, 'A');
  klee = new Character('Klee', 'An explosives expert and a regular at the Knights of Favonius\' confinement room. Also known as Fleeing Sunlight.', Element.Pyro, 5, 'S');
  diona = new Character('Diona', 'A young lady who has inherited trace amounts of non-human blood. She is the incredible popular bartender of the Cat\'s Tail tavern.', Element.Cryo, 4, '-');
  barbara = new Character('Barbara', 'Every denizen of Mondstadt adores Barbara. However, she learned the word "idol" from a magazine.', Element.Hydro, 4, 'B');

  party: PartyCharacter[] = [
    new PartyCharacter(this.keqing, 60, 4),
    new PartyCharacter(this.klee, 60, 4),
    new PartyCharacter(this.diona, 50, 3),
    new PartyCharacter(this.barbara, 52, 3)
  ];

  selectedCharacter: PartyCharacter;

  constructor() {
    this.keqing.portrait = 'https://rerollcdn.com/GENSHIN/Characters/Keqing.png';
    this.klee.portrait = 'https://rerollcdn.com/GENSHIN/Characters/Klee.png';
    this.diona.portrait = 'https://rerollcdn.com/GENSHIN/Characters/Diona.png';
    this.barbara.portrait = 'https://rerollcdn.com/GENSHIN/Characters/Barbara.png';
  }

  ngOnInit(): void {
  }

  onSelected(event: PartyCharacter): void{
    this.selectedCharacter = event;
  }
}
