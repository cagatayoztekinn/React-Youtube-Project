import React, { useEffect, useState } from "react";
import { Card, CardContent, Container, Form, Grid, GridColumn, Icon, Image, Input, Segment } from "semantic-ui-react";
import {Item} from './models/IVideos';
import getVideos from './config/Service'
import { Link } from "react-router-dom";
import moment from "moment";

function App() {

  const [videos,setVideos] =useState<Item[]>([])
  const [input,setInput] = useState("")
  const [favVideos, setFavVideos] = useState<Item[]>([]);
  const [lastVideos, setLastVideos] = useState<Item[]>([]);

  useEffect(() => {
    getLastVideos();
    
  }, []);
  useEffect(() => {
    getFavVideos();
  }, [])
  function getLastVideos() {
    const lastVids = localStorage.getItem("lastWatched");
    if (lastVids != null) {
      const parsedLastVids: Item[] = JSON.parse(lastVids);
      setLastVideos(parsedLastVids);
    }
  }
  function getFavVideos() {
    const favVids = localStorage.getItem("favoritesLocal");
    if (favVids != null) {
      const parsedFavVids: Item[] = JSON.parse(favVids);
      setFavVideos(parsedFavVids);
    }
  }

  function getVideo(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(`input ==> `, input);
    getVideos(input).then( res=> {
      console.log('Veri geldi..');
      const videoArr: Item[] = [];
      res.data.items.map((item:Item) => {
        return videoArr.push(item)
      })
      setVideos(videoArr)
    })
    
  }
  function getLocalTime(time:Date) {
    const str = String(time);
    const date = moment(str);
    const dateComp = date.utc().format('YYYY-MM-DD');
    const timeComp = date.utc().format('HH:mm:ss');
    return (dateComp + " " + timeComp)
  }
  function cardDetail(video: Item) {
    localStorage.setItem("videoLocal", JSON.stringify(video));
    const lastWatched = localStorage.getItem("lastWatched");
    if (lastWatched == null) {
      const lastWatchedArr: Item[] = [];
      lastWatchedArr.unshift(video);
      localStorage.setItem("lastWatched", JSON.stringify(lastWatchedArr));
    } else {
      const parsedLastWatched: Item[] = JSON.parse(lastWatched);
      parsedLastWatched.unshift(video);
      if (parsedLastWatched.length > 6) {
        parsedLastWatched.pop();
      }
      localStorage.setItem("lastWatched", JSON.stringify(parsedLastWatched));
    }
  }

  
  return (
    <>
     <Container textAlign="center" style={{ marginBottom: 40 }}>
     <h1 style={{fontSize: 29,  color: '#414b59' }}> Bilge Adam Youtube
     </h1>
     <Form onSubmit={(e) => getVideo(e)}>
          <Input 
          style={{width:700}}
            required
            onChange={(e) => setInput(e.target.value)}
            action={{
              type: "submit",
              icon: "search",
              color: "linkedin",
            }}
            placeholder="Arama Yap"
            focus
          />
        </Form>
        <Segment>
        {videos.length > 0 && (
            <h2 style={{ color: '#414b59',fontSize:'13' }}>Arama Sonuçları</h2>
          )}
          <Grid style={{ textAlign: "-webkit-center" }} columns="3">
            {videos.length > 0 &&
              videos.map((item, index) => {
                return (
                  <GridColumn key={index}>
                    <Card
                      as={Link}
                      to={"/video/" + item.id?.videoId}
                      onClick={() => cardDetail(item)}
                    >
                      <Image
                       src={item.snippet?.thumbnails?.high?.url}
                       width={item.snippet?.thumbnails?.high?.width}
                       wrapped
                       ui={false}
                       
                      />
                      <Card.Content>
                        <Card.Header
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: "1",
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {item.snippet?.title}
                        </Card.Header>
                        <Card.Meta>
                        <span className="date">
                            {getLocalTime(item.snippet?.publishTime!)}
                          </span>
                        </Card.Meta>
                        <Card.Description>
                          {item.snippet?.channelTitle}
                        </Card.Description>
                      </Card.Content>
                    </Card>
                  </GridColumn>
                );
              })}
          </Grid>
        </Segment>
        <Segment style={{ marginBottom: 40 }}>
          {favVideos.length > 0 && <h2 style={{fontSize: 29,  color: '#414b59' }}>Favorilerim</h2>}
          <Grid style={{ textAlign: "-webkit-center" }} columns="3">
            {favVideos.length > 0 &&
              favVideos.map((item, index) => {
                return (
                  <GridColumn key={index}>
                    
                    <Card
                      as={Link}
                      to={"/video/" + item.id?.videoId}
                      onClick={() => cardDetail(item)}
                    >
                      <Image
                        src={item.snippet?.thumbnails?.high?.url}
                        width={item.snippet?.thumbnails?.high?.width}
                        wrapped
                        ui={false}
                      />
                      <Card.Content>
                        <Card.Header
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: "1",
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {item.snippet?.title}
                        </Card.Header>
                        <Card.Meta>
                          <span className="date">
                            {getLocalTime(item.snippet?.publishTime!)}
                          </span>
                        </Card.Meta>
                        <Card.Description>
                        {item.snippet?.channelTitle}
                        </Card.Description>
                      </Card.Content>
                    </Card>
                    
                  </GridColumn>
                );
              })}
          </Grid>
        </Segment>
        <Segment>
          {lastVideos.length > 0 && <h2 style={{fontSize: 29,  color: '#414b59' }}>Son İzlediklerim</h2>}
          <Grid style={{ textAlign: "-webkit-center" }} columns="3">
            {lastVideos.length > 0 &&
              lastVideos.map((item, index) => {
                return (
                  <GridColumn key={index}>
                    <Card
                      as={Link}
                      to={"/video/" + item.id?.videoId}
                      onClick={() => cardDetail(item)}
                    >
                      <Image
                        src={item.snippet?.thumbnails?.high?.url}
                        width={item.snippet?.thumbnails?.high?.width}
                        wrapped
                        ui={false}
                      />
                      <Card.Content>
                        <Card.Header
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: "1",
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {item.snippet?.title}
                        </Card.Header>
                        <Card.Meta>
                          <span className="date">
                            {getLocalTime(item.snippet?.publishTime!)}
                          </span>
                        </Card.Meta>
                        <Card.Description>
                          {item.snippet?.channelTitle}
                        </Card.Description>
                      </Card.Content>
                    </Card>
                  </GridColumn>
                );
              })}
          </Grid>
        </Segment>

        
        


     </Container>
    </>
  );
}

export default App;
