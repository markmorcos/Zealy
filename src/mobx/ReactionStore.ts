import { action, makeObservable, observable } from "mobx";

import { ICoordinates } from "../types";

class Reaction {
  @observable text: string = "";
  @observable coordinates: ICoordinates = { x: 0, y: 0 };

  @observable comments: string[] = [];

  constructor() {
    makeObservable(this);
  }
}

export class ReactionStore {
  @observable draft: boolean = false;
  @observable reactionDraft: Reaction = new Reaction();
  @observable commentDraft: string = "";
  @observable reactions: Reaction[] = [
    {
      text: "Hello",
      coordinates: { x: 100, y: 100 },
      comments: ["World"],
    },
    {
      text: "Foo",
      coordinates: { x: 500, y: 300 },
      comments: ["Bar"],
    },
  ];

  @action startDraft = (coordinates: ICoordinates) => {
    this.draft = true;
    this.setReactionDraftCoordinates(coordinates);
  };

  @action setReactionDraftText = (text: string) => {
    this.reactionDraft.text = text;
  };

  @action setReactionDraftCoordinates = (coordinates: ICoordinates) => {
    this.reactionDraft.coordinates = coordinates;
  };

  @action cancelDraft = () => {
    this.draft = false;
    this.reactionDraft = new Reaction();
  };

  @action addReaction = () => {
    this.reactions.push(this.reactionDraft);
    this.cancelDraft();
  };

  @action addComment = (reactionIndex: number, text: string) => {
    this.reactions[reactionIndex].comments.push(text);
    this.commentDraft = "";
  };
}

export const reactionStore = new ReactionStore();
