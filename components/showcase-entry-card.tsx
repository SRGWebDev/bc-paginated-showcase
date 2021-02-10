import React from 'react';
// import { makeStyles } from '@material-ui/core/styles'; // TODO
import {Card, CardContent, CardMedia, Link, Typography} from '@material-ui/core';
import {ShowcaseEntry} from '../models';

type ShowcaseEntryCardProps = ShowcaseEntry; // TODO pick specific ShowCaseEntry props

export default function ShowcaseEntryCard(props: ShowcaseEntryCardProps) {
  const {description, image, title, url} = props;

  return (
    <Card style={{maxWidth: '100%'}}>
        <CardMedia
            style={{height: 140}}
            image={image.url}
            title={image.title}
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                {title}
            </Typography>
            <Link href={url.value} target={url.target} rel={url.nofollow} underline="always">
              Visit
              {/* TODO replace w/ link icon (w/aria label)? */}
            </Link>
          {description && (
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          )}
        </CardContent>
    </Card>
  );
}
