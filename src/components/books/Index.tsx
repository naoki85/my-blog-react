import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
// import ReactSimplePaginationComponent from '@naoki85/react-simple-pagination-component';
// import CircularProgress from '@material-ui/core/CircularProgress';
import ScrollToTopOnMount from "../ScrollToTop";
import {Book} from "../../entities/book";
import {BookRow} from "./BookRow";
import Typography from "@material-ui/core/Typography";

const booksData = [
  {title: 'Kubernetesで実践するクラウドネイティブDevOps', url: 'https://www.amazon.co.jp/Kubernetes%E3%81%A7%E5%AE%9F%E8%B7%B5%E3%81%99%E3%82%8B%E3%82%AF%E3%83%A9%E3%82%A6%E3%83%89%E3%83%8D%E3%82%A4%E3%83%86%E3%82%A3%E3%83%96DevOps-John-Arundel/dp/4873119014/ref=as_li_ss_il?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=1FY2121DBMYH7&dchild=1&keywords=kubernetes%E3%81%A7%E5%AE%9F%E8%B7%B5%E3%81%99%E3%82%8B%E3%82%AF%E3%83%A9%E3%82%A6%E3%83%89%E3%83%8D%E3%82%A4%E3%83%86%E3%82%A3%E3%83%96devops&qid=1585968044&sprefix=kubernetes,aps,257&sr=8-1&linkCode=li2&tag=naoki850c-22&linkId=df34219c23967f9f1eae5ad8d63e2a03&language=ja_JP', imageUrl: '//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4873119014&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=naoki850c-22&language=ja_JP'},
  {title: 'エンジニアのための時間管理術', url: 'https://www.amazon.co.jp/%E3%82%A8%E3%83%B3%E3%82%B8%E3%83%8B%E3%82%A2%E3%81%AE%E3%81%9F%E3%82%81%E3%81%AE%E6%99%82%E9%96%93%E7%AE%A1%E7%90%86%E8%A1%93-Thomas-Limoncelli/dp/4873113075/ref=as_li_ss_il?ie=UTF8&linkCode=li2&tag=naoki850c-22&linkId=8b0ed89b609f17c70112dedf43645d14&language=ja_JP', imageUrl: '//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4873113075&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=naoki850c-22&language=ja_JP'},
  {title: '「畳み人」という選択', url: 'https://www.amazon.co.jp/dp/B0851D4KNX/ref=as_li_ss_il?_encoding=UTF8&btkr=1&linkCode=li2&tag=naoki850c-22&linkId=ea3c6b4f7afb41543d1ed168d0c3dfeb&language=ja_JP', imageUrl: '//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B0851D4KNX&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=naoki850c-22&language=ja_JP'},
  {title: 'みずほ銀行システム統合、苦闘の 19 年史', url: 'https://www.amazon.co.jp/dp/B084QBQDZ3/ref=as_li_ss_il?_encoding=UTF8&btkr=1&linkCode=li2&tag=naoki850c-22&linkId=ddc613c4797908f523e9ade78fc2b16e&language=ja_JP', imageUrl: '//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B084QBQDZ3&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=naoki850c-22&language=ja_JP'},
];

const buildBooks = (): Book[] => {
  return booksData.map(b => {
    return new Book(b);
  })
};


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardGrid: {
      marginTop: theme.spacing(3),
    },
    progress: {
      margin: theme.spacing(3),
    },
    progressArea: {
      textAlign: 'center',
    },
    title: {
      marginTop: theme.spacing(3),
    }
  })
);

export const BooksIndex: FC = () => {
  const classes = useStyles();
  const books = buildBooks();

  return (
    <>
      <ScrollToTopOnMount />
      <Typography variant="h3" className={classes.title}>
        読んだ本
      </Typography>
      <Grid container spacing={4} className={classes.cardGrid}>
        {books.map(book => {
          return (
            <BookRow
              key={book.title}
              book={book}
            />
          )
        })}
      </Grid>
    </>
  );
};
