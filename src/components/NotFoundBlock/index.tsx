import styles from './NotFoundBlock.module.scss';

console.log(styles);

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Nothing was found
      </h1>
      <p>Unfortunately this page doesn't exist in our online store</p>
    </div>
  );
};

export default NotFoundBlock;
