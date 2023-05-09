import { BtnCollapse, BtnRight, BtnLeft } from '../button'
import { placeholderPic } from '../../../../assets/index'

const App = ({ detailImage, setDetailImage }) => {
  let min = 0, max = detailImage?.queue?.length -1 || 0

  const onChangeQueue = (pos) => {
    setDetailImage({
      src: detailImage.queue[pos],
      queue: detailImage.queue, 
      pos: pos
    })
  }

  const handleQueue = (increase) => increase 
    ? onChangeQueue(detailImage.pos < max ? detailImage.pos+1 : max)
    : onChangeQueue(detailImage.pos > min ? detailImage.pos-1 : min)

    return detailImage ? (
    <div className="flex fixed mx-auto top-0 right-0 left-0 bottom-0 backdrop-filter backdrop-blur-lg animate-fade-in-up"> 
      <div className="flex mx-auto items-center justify-center h-auto w-full md:h-full md:w-auto">
        <img className="object-contain h-auto w-full md:h-full md:w-auto animate-fade-in-down" src={detailImage.src ? detailImage.src : placeholderPic} alt="detail cover" />
      </div>
      <div className="absolute right-0 top-0">
        <BtnCollapse onClick={() => setDetailImage(null)}/>
      { detailImage.queue? detailImage.queue.length?
        <div className="absolute right-0 top-30">
          <BtnLeft onClick={() => handleQueue(false)}/>
          <BtnRight onClick={() => handleQueue(true)}/>
        </div> :null :null }
      </div>
    </div>) : null } 

export default App