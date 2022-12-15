import { useId } from "react";
import styles from "../styles/Character.module.scss";

const Character = ({
  name,
  status,
  species,
  type,
  gender,
  locationName,
  episodes,
}) => {
  const id = useId();

  return (
    <div className={styles.character}>
      <p>
        <b>Name:</b> {name}
      </p>
      <p>
        <b>Status:</b> {status}
      </p>
      <p>
        <b>Species:</b> {species}
      </p>
      <p>
        <b>Type:</b> {type ? type : "none"}
      </p>
      <p>
        <b>Gender:</b> {gender}
      </p>
      <p>
        <b>Location name:</b> {locationName}
      </p>
      <ul>
        <p>
          <b>Episode name:</b>
        </p>
        {episodes.map((episode, index) => (
          <li className={styles.itemList} key={`${id}-${index}`}>
            {episode.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Character;
