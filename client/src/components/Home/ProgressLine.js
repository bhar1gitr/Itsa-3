import { Link } from "react-router-dom";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Button } from "@mui/material";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

const VerticalAlternatingTimeline = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: "20px", marginBottom: "20px" }}>Time-Line</h1>
      <VerticalTimeline animate='true' lineColor='#1976d2'>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: 'yellow', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  yellow' }}
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          icon={<MenuBookIcon />}
        >
          <h3 style={{color:'black'}} className="vertical-timeline-element-title">Learn Courses Online</h3>
          <Button><Link  style={{textDecoration:'none',color:'black'}} to='/faculty'>View More</Link></Button>

        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          icon={<GroupAddIcon />}
        >
          <h3 style={{color:'black'}} className="vertical-timeline-element-title">Faculty Profile</h3>
          <Button><Link style={{textDecoration:'none',color:'black'}} to='/faculty'>View More</Link></Button>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: 'yellow', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  yellow' }}
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          icon={<Diversity3Icon />}
        >
          <h3 style={{color:'black'}} className="vertical-timeline-element-title">Student Organization</h3>
          <Button><Link  style={{textDecoration:'none',color:'black'}} to='/faculty'>View More</Link></Button>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          icon={<WorkspacePremiumIcon />}
        >
          <h3 style={{color:'black'}} className="vertical-timeline-element-title">Department Achievements</h3>
          <Button><Link  style={{textDecoration:'none',color:'black'}} to='/faculty'>View More</Link></Button>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </div>
  );
};

export default VerticalAlternatingTimeline;