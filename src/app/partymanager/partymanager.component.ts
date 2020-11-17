import {Component, OnInit} from '@angular/core';
import {Character} from '../model/Character';
import {PartyMember} from '../model/PartyMember';
import { CharacterService } from '../services/character.service';

@Component({
  selector: 'app-partymanager',
  templateUrl: './partymanager.component.html',
  styleUrls: ['./partymanager.component.css'],
  providers: [CharacterService]
})
export class PartymanagerComponent implements OnInit {
  public characters: Map<string, Character>;
  public party: PartyMember[] = [];
  public selectedCharacter: PartyMember;

  constructor(private characterService: CharacterService) {
    // this.keqing.icon = 'https://rerollcdn.com/GENSHIN/Characters/Keqing.png';
    // this.keqing.portrait = 'assets/cards/Keqing.jpg';
    // this.klee.icon = 'https://rerollcdn.com/GENSHIN/Characters/Klee.png';
    // this.klee.portrait = 'assets/cards/Klee.jpg';
    // this.diona.icon = 'https://rerollcdn.com/GENSHIN/Characters/Diona.png';
    // this.diona.portrait = 'assets/cards/Diona.jpg';
    // this.barbara.icon = 'https://rerollcdn.com/GENSHIN/Characters/Barbara.png';
    // this.barbara.portrait = 'assets/cards/Barbara.jpg';
  }

  ngOnInit(): void {
     this.characters = new Map<string, Character>();
     this.characterService.getCharacters().subscribe(data => {
       for (const character of data){
         this.characters.set(character.name.toLowerCase(), character);
       }
       this.party.push(new PartyMember(this.characters.get('traveler (anemo)'), 1, 1));
       this.party.push(new PartyMember(this.characters.get('amber'), 1, 1));
       this.party.push(new PartyMember(this.characters.get('kaeya'), 1, 1));
       this.party.push(new PartyMember(this.characters.get('lisa'), 1, 1));
     });
  }

  onSelected(member: PartyMember): void{
    this.selectedCharacter = member;
  }

  onRemoved(member: PartyMember): void{
    const index: number = this.party.indexOf(member);
    this.party.splice(index, 1);
    this.selectedCharacter = null;
  }

  onCloseDetail(): void{
    this.selectedCharacter = null;
  }
}
