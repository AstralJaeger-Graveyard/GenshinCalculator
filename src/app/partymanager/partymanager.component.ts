import {Component, OnInit} from '@angular/core';
import {Element} from '../model/Element';
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
    // this.keqing.portrait = 'assets/portraits/Keqing.jpg';
    // this.klee.icon = 'https://rerollcdn.com/GENSHIN/Characters/Klee.png';
    // this.klee.portrait = 'assets/portraits/Klee.jpg';
    // this.diona.icon = 'https://rerollcdn.com/GENSHIN/Characters/Diona.png';
    // this.diona.portrait = 'assets/portraits/Diona.jpg';
    // this.barbara.icon = 'https://rerollcdn.com/GENSHIN/Characters/Barbara.png';
    // this.barbara.portrait = 'assets/portraits/Barbara.jpg';
  }

  ngOnInit(): void {
     this.characters = new Map<string, Character>();
     this.characterService.getCharacters().subscribe(data => {
       const characters = (data as Character[]);
       for (const character of characters){
         this.characters.set(character.name.toLowerCase(), character);
       }
       this.party.push(new PartyMember(this.characters.get('keqing'), 60, 4));
       this.party.push(new PartyMember(this.characters.get('klee'), 60, 4));
       this.party.push(new PartyMember(this.characters.get('diona'), 60, 4));
       this.party.push(new PartyMember(this.characters.get('barbara'), 60, 4));
     });
  }

  onSelected(event: PartyMember): void{
    this.selectedCharacter = event;
  }
}
