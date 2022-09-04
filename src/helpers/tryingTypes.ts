// manual test
export default "default";

type SharedDollProps = {
  hungry: number;
  size: "big" | "medium" | "small";
};

type PersonDoll = {
  modelName: "person";
  dollAnimations: { walking: true; running: true };
} & SharedDollProps;

type PuppyDoll = {
  modelName: "puppy";
  dollAnimations: { trotting: true; chasing: true };
} & SharedDollProps;

type ADoll = PersonDoll | PuppyDoll;

const testDoll: ADoll = {
  hungry: 5,
  size: "medium",
  modelName: "person",
  dollAnimations: { running: true, walking: true },
};

function makeDoll<T_DollType extends ADoll>(dollOptions: T_DollType) {
  return dollOptions;
}

const testDolls: Record<string, ADoll> = {
  testPerson: makeDoll({
    modelName: "person",
    dollAnimations: { running: true, walking: true },
    hungry: 1,
    size: "medium",
  }),
  testPuppy: makeDoll({
    modelName: "puppy",
    dollAnimations: { chasing: true, trotting: true },
    hungry: 1,
    size: "medium",
  }),
};

const something =
  testDolls.testPerson.modelName === "person" &&
  testDolls.testPerson.dollAnimations.running;
