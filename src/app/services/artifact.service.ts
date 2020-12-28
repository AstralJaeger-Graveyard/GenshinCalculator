import {Injectable, isDevMode} from '@angular/core';
import {Artifact} from "../model/Artifact";
// @ts-ignore
import * as data from "../_dataassets/artifacts_2.json";

@Injectable({
  providedIn: 'root'
})
export class ArtifactService {

  public artifacts: Artifact[] = data.artifacts;
  public artifactMap = new Map<string, Artifact>();

  constructor() {
    for (let artifact of this.artifacts) {
      if (isDevMode() && this.artifactMap.has(artifact.id)){
        console.log(`%c Duplocate item with id: ${artifact.id}`, 'color: Crimson; font-size: 20px;');
      }
      this.artifactMap.set(artifact.id, artifact);
    }

    console.dir(this.artifactMap);
  }

  public get(id: string): Artifact{
    if (isDevMode() && !this.artifactMap.has(id)){
      console.log('%c Could not find item with id: ' + id, 'color: red; font-size: 20px;');
    }
    return this.artifactMap.get(id);
  }
}
