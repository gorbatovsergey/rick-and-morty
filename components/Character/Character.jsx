import { useId } from "react";
import { сharacterInformationElements } from "../../constants/constants";
import styles from "./character.module.scss";

const Character = ({ character }) => {
  const id = useId();

  const getCharacterData = (key) => {
    if (key === "episode") {
      return character[key].map(({ name }, index) => (
        <ul key={`${id}-${index}`}>
          <li className={styles.itemList}>{name}</li>
        </ul>
      ));
    }

    if (key === "location") {
      return character[key]["name"];
    }

    return character[key];
  };

  return (
    <div className={styles.character}>
      {сharacterInformationElements.map(({ text, key }, index) => (
        <div key={index}>
          <b>{text}</b> {getCharacterData(key) || "none"}
        </div>
      ))}
    </div>
  );
};

export default Character;
