import Category from "../pages/Category";
import Courses from "../pages/Courses";
import AddCourse from "../pages/AddCourse";
import EditCourse from "../pages/EditCourse";
import ViewCourse from "../pages/ViewCourse";
import Users from "../pages/Users";
import EditUser from "../pages/EditUser";
import ViewUser from "../pages/ViewUser";
import EBooks from "../pages/EBooks";
import AddEBook from "../pages/AddEBook";
import EditEBook from "../pages/EditEBook";
import ViewEBook from "../pages/ViewEBook";
import Jobs from "../pages/Jobs";
import AddJob from "../pages/AddJob";
import EditJob from "../pages/EditJob";
import ViewJob from "../pages/ViewJob";
import AddLecture from "../pages/AddLecture";
import ViewLecture from "../pages/ViewLecture";
import EditLecture from "../pages/EditLecture";
import Subscriptions from "../pages/Subscriptions";
import AddSubscription from "../pages/AddSubscription";
import ViewSubscription from "../pages/ViewSubscription";
import Slider from "../pages/Slider";
import EditSlider from "../pages/EditSlider";
import Shorts from "../pages/Shorts";
import AddShort from "../pages/AddShort";
import EditShort from "../pages/EditShort";
import ViewShort from "../pages/ViewShort";

export const AppRoute = [
  {path:'category',component:Category},
  {path:'courses',component:Courses},
  {path:'courses/add',component:AddCourse},
  {path:'courses/edit/:id',component:EditCourse},
  {path:'courses/view/:id',component:ViewCourse},
  {path:'courses/view/:id/add-lecture',component:AddLecture},
  {path:'courses/view/:id/lecture/:lectureId',component:ViewLecture},
  {path:'courses/view/:id/lecture/edit/:lectureId',component:EditLecture},
  {path:'users',component:Users},
  {path:'users/edit/:id',component:EditUser},
  {path:'users/view/:id',component:ViewUser},
  {path:'ebooks',component:EBooks},
  {path:'ebooks/add',component:AddEBook},
  {path:'ebooks/edit/:id',component:EditEBook},
  {path:'ebooks/view/:id',component:ViewEBook},
  {path:'jobs',component:Jobs},
  {path:'jobs/add',component:AddJob},
  {path:'jobs/edit/:id',component:EditJob},
  {path:'jobs/view/:id',component:ViewJob},
  {path:'subscriptions',component:Subscriptions},
  {path:'subscriptions/add',component:AddSubscription},
  {path:'subscriptions/edit/:id',component:AddSubscription},
  {path:'subscriptions/view/:id',component:ViewSubscription},
  {path:'slider',component:Slider},
  {path:'slider/edit/:id',component:EditSlider},
  {path:'shorts',component:Shorts},
  {path:'shorts/add',component:AddShort},
  {path:'shorts/edit/:id',component:EditShort},
  {path:'shorts/view/:id',component:ViewShort},
]