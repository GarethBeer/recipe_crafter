import axios from 'axios'

export const getEventsBlob = async (
    container: string,
    blob: string,
    path: string = '',
    audit: boolean = false
  )=> {
    return axios.get(`/api/getBlob`, {
        params: {
            id: blob,
            container:container,
            path:path,
            audit:audit
        }
    })


};

export const sendEvent = (event: any, eventContainer: string): Promise<any> => {
    return axios.post('/api/sendEvent', {
        params: {
            eventContainer: eventContainer,
            id: event.data.id
          },
      body: event,
    });
  };
  
