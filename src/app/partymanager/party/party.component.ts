import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PartyMember} from '../../model/PartyMember';
import {Character} from '../../model/Character';
import {CharacterService} from '../../services/character.service';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css'],
  providers: [CharacterService]
})
export class PartyComponent implements OnInit {

  @Input()
  party: PartyMember[];

  @Input()
  characters: Map<string, Character> = new Map<string, Character>();

  @Output()
  memberSelected = new EventEmitter<PartyMember>();

  constructor(private characterService: CharacterService) {
    this.characterService.getCharacters().subscribe(data => {
      const characters = (data as Character[]);
      for (const character of characters){
        this.characters.set(character.name.toLowerCase(), character);
      }
    });
  }

  ngOnInit(): void {

  }

  onSelected(member: PartyMember): void{
    console.log('Switching selected member to: ' + member.character.name);
    this.memberSelected.emit(member);
  }
}
