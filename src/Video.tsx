import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Embed, Form, Grid, GridColumn, Segment } from 'semantic-ui-react'
import { Item } from './models/IVideos';
import moment from "moment";



export default function Video() {
    const [video, setVideo] = useState<Item>();
    const [localStatus, setLocalStatus] = useState(true);
    const [ekle, setEkle] = useState(true);
    const [sil, setSil] = useState(true);
    

    useEffect(() => {
        checkLocal();
        EkleSilControl();
      }, [ekle,sil]);

      function EkleSilControl(){
        const favorites = localStorage.getItem("favoritesLocal");
        let st = true ;
        if (favorites === null) {
          setSil(true);
          setEkle(false);
        }else if (favorites != null) {
          const parsedFavs:Item[] = JSON.parse(favorites);
          for (const index in parsedFavs) {
            if (parsedFavs[index].id?.videoId === video?.id?.videoId) {
              setSil(false)
              setEkle(true);
              st = false
              break;
            }
          } 
          if (st) {
            setSil(true);
            setEkle(false)
          }
        }
      }
    
     
    
      function checkLocal() {
        const local = localStorage.getItem("videoLocal");
        const parseLocal = JSON.parse(local!);
        if (local != null && parseLocal !== undefined) {
          console.log("parseLocal :>> ", parseLocal);
          setVideo(parseLocal);
        } else {
          window.location.href = "/";
        }
      }
      function FavEkle() {
        const favoritesLocal = localStorage.getItem("favoritesLocal");
        if (favoritesLocal == null && video !== undefined) {
          const favArr: Item[] = [];
          favArr.push(video);
          localStorage.setItem("favoritesLocal", JSON.stringify(favArr));
          setEkle(true);
          setSil(false)
        } else if (favoritesLocal != null && video !== undefined) {
          const parsedLocal: Item[] = JSON.parse(favoritesLocal);
          for (const item of parsedLocal) {
            if (item.id?.videoId === video.id?.videoId) {
              alert("var");
              setLocalStatus(!localStatus);
              break;
            }
          }
          if (localStatus) {
            parsedLocal.push(video);
            localStorage.setItem("favoritesLocal", JSON.stringify(parsedLocal));
            setEkle(true)
            setSil(false)
          }
        }
      }
      function FavSil() {
        const favVids = localStorage.getItem("favoritesLocal");
        const parsedFavVids: Item[] = JSON.parse(favVids!);
        const index = parsedFavVids.indexOf(video!)
        parsedFavVids.splice(index, 1);
        if (parsedFavVids.length > 0) {
          localStorage.setItem("favoritesLocal", JSON.stringify(parsedFavVids));
        } else {
          localStorage.removeItem("favoritesLocal");
        }
        setEkle(true);
        setSil(false)

      }
    
      function getDate(time: Date) {
        const str = String(time);
        const date = moment(str);
        const dateComp = date.utc().format("YYYY-MM-DD");
        const timeComp = date.utc().format("HH:mm:ss");
        return dateComp + " " + timeComp;
      }
    
    
    return (
        <>
         <Container>
        <Grid doubling columns="2">
          {video && (
            <Fragment>
              <GridColumn width="12">
                <Embed
                  id={video?.id?.videoId}
                  active 
                  source='youtube'
                  onClick={(e, data) => console.log(e)}
                  iframe={{
                    allowFullScreen: true,

                    style: {
                      padding: 10,
                    },
                  }}
                />
              </GridColumn>
              <GridColumn width="4">
                <Form>
                  <h2>  {" "} {video.snippet?.title}  {" "} </h2>
                  <Button 
                    title="Fav Ekle!"
                    icon="heart"
                    color="youtube"  
                    disabled={ekle}
                    type="submit"
                    onClick={() => FavEkle()}
                    
                  />
                  <Button
                    title="Fav Çıkar!"
                    icon="trash"
                    color="linkedin"
                    disabled={sil}
                    type="submit"
                    onClick={() => FavSil()}
                  />
                  
                  <Form.Field>
                    <label> Kanal Adı </label>
                    <Segment>
                      {" "}
                      <p> {video.snippet?.channelTitle} </p>{" "}
                    </Segment>
                  </Form.Field>
                  <Form.Field>
                    <label> Video Detay </label>
                    <Segment>
                      {" "}
                      <p> {video.snippet?.description} </p>{" "}
                    </Segment>
                  </Form.Field>
                  <Form.Field>
                    <label> Paylaşılma Tarihi </label>
                    <Segment>
                      {" "}
                      <p> {getDate(video.snippet?.publishTime!)} </p>{" "}
                    </Segment>
                  </Form.Field>

                  
                </Form>
              </GridColumn>
            </Fragment>
          )}
        </Grid>

       </Container>
            
        </>
    )
}
