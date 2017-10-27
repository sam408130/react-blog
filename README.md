第一部分主要使用React提供的组件，创建博客页面的展示，包括文章列表页面和文章详情页面。让我们开始吧。。。
## React
先粗略的介绍一下React，React是一个用于构建用户界面的 JavaScript 库，它有以下几个特点：
- 声明式
React 可以非常轻松地创建用户交互界面。为你应用的每一个状态设计简洁的视图，在数据改变时 React 也可以高效地更新渲染界面。以声明式编写UI，可以让你的代码更加可靠，且方便调试。
- 组件化
创建好拥有各自状态的组件，再由组件构成更加复杂的界面。无需再用模版代码，通过使用JavaScript编写的组件你可以更好地传递数据，将应用状态和DOM拆分开来。
- 一次学习，随处编写
无论你现在正在使用什么技术栈，你都可以随时引入 React 开发新特性。React 也可以用作开发原生应用的框架 [React Native](https://facebook.github.io/react-native/).

有关React的基础语法学习，大家可以查看[官方教程](https://reactjs.org)

## 创建一个新的项目
使用[Create React App](http://github.com/facebookincubator/create-react-app)初始化是非常方便的，在安装时请先确保你已经安装了node.js(6.0+)
```
#下载create-ract-app相关组件
npm install -g create-react-app

#创建react-blog
create-react-app react-blog
```

![屏幕快照 2017-10-26 下午2.50.25.png](http://upload-images.jianshu.io/upload_images/1224641-46d7f5e89140bedd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
至此，我们项目结构是这样的，执行下面语句，删除不必要的文件

```
cd react-blog
rm -f src/*
```
## 博客首页
我们创建一个名叫Home的Component，用来展示博客的首页

![屏幕快照 2017-10-26 下午3.05.21.png](http://upload-images.jianshu.io/upload_images/1224641-f643b643b391629c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这里我创建的两个文件夹components和containers用于存放所有的公共组件和页面。
```
import React, { Component } from 'react';
import style from './style.css';

class Home extends Component {
    render() {
        return (
            <h1>Sam's Blog</h1>
        )
    }
};

export default Home;
```
下面修改`index.js`文件，引入我们刚刚创建的`Home`
```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './containers/Home/Home';

ReactDOM.render(<Home />, document.getElementById('root'));
```
控制台输入`npm start`先看一下效果吧
![屏幕快照 2017-10-26 下午3.11.56.png](http://upload-images.jianshu.io/upload_images/1224641-c97d694353d6c026.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

在开始之前，需要先设计一下页面结构，这样可以事半功倍。博客首页主要有三部分：
- 头部信息
- 导航
- 文章列表

依次初始化这三部分：

![屏幕快照 2017-10-26 下午3.20.21.png](http://upload-images.jianshu.io/upload_images/1224641-0e24798bd86296dd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### Header
`Header`用于展示博主信息，以及之后的登录入口，包含头像，名称，以及一段话
```
import React, { Component } from 'react';
import './style.css';
const logo = require('./logo.svg');

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <span className="log">
                    <img src={logo} />
                </span>
                <h1>Sam's Blog</h1>
                <p>If   you   can't   measure   it ,    you   can't   improve   it</p>
            </div>
        )

    }
}
```
然后在`Home`中引入`Header`这个Component
```
import React, { Component } from 'react';
import './style.css';
import Header from '../../components/Header/Header'

class Home extends Component {
    render() {
        return (
            <div className="container">
                <Header />
            </div>
        )
    }
};

export default Home;
```
现在我们的页面就变成这样了(css部分请查看源代码)

![屏幕快照 2017-10-26 下午4.18.47.png](http://upload-images.jianshu.io/upload_images/1224641-7cc987eeeed96c93.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### Menu
Menu部分用于展示文章的所有分类，这里我们将会使用到[Ant Design](https://ant.design/index-cn)中的部分组件
```
npm install --save antd
```
安装完成后，我们直接引用其中的Menu模块
```
import { Menu } from 'antd'
```
我们先预先定义几个分类:
```
const categories = ['首页','iOS','Python','ReactJs']
```
根据antd中的Menu封装博客的导航
```
import React, { Component } from 'react';
import './style.css';
import { Menu, } from 'antd';

const categories = ['首页','iOS','Python','ReactJs'];

export default class Menus extends Component {
    constructor(props) {
        super(props)
        this.state = {
            current: categories[0]
        }
    }

    handleClick = (e) => {
        this.setState ({
            current: e.key
        })
    }

    render() {
        return (
            <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
                className="menucontainer"
            >
                {
                    categories.map((item,index)=>(
                        <Menu.Item key={item} >
                            {item}
                        </Menu.Item>
                    ))
                }
            </Menu>
        )
    }
}
```
`constructor`方法中可以初始化state，我们设置当前选中的为categories中第一个元素。
`Menu`模块还有其他的样式供我们选择，搭配`Layout`可以做出很多样式的基础结构，详情请查阅`antd`相关资料，需要注意的是，记得引用`antd`的css文件：
```
import 'antd/dist/antd.css'
```
在`Home`中引入`Menus`模块：
```
import React, { Component } from 'react';
import './style.css';
import Header from '../../components/Header/Header';
import Menus from '../../components/Menus/Menus';

class Home extends Component {
    render() {
        return (
            <div className="container">
                <Header />
                <div className="nav">
                    <Menus />
                </div>
                <div className="main">
                    这里是文章列表
                </div>
            </div>
        )
    }
};

export default Home;
```
现在首页变成如下样式了：

![屏幕快照 2017-10-26 下午6.53.06.png](http://upload-images.jianshu.io/upload_images/1224641-ba0ed1c9c5634229.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### Route
`React Router4`是一个流行的纯React重写的包。现在的版本中已不需要路由配置，现在一切皆组件。
##### 1.安装
`React Router`被拆分成三个包：`react-router`,`react-router-dom`和`react-router-native`。`react-router`提供核心的路由组件与函数。其余两个则提供运行环境（即浏览器与`react-native`）所需的特定组件。

进行网站（将会运行在浏览器环境中）构建，我们应当安装`react-router-dom`。`react-router-dom`暴露出`react-router`中暴露的对象与方法，因此你只需要安装并引用`react-router-dom`即可。

```
npm install --save react-router-dom
```
##### 2.路由器(Router)
在你开始项目前，你需要决定你使用的路由器的类型。对于网页项目，存在`<BrowserRouter>`与`<HashRouter>`两种组件。当存在服务区来管理动态请求时，需要使用`<BrowserRouter>`组件，而`<HashRouter>`被用于静态网站。

通常，我们更倾向选择`<BrowserRouter>`，但如果你的网站仅用来呈现静态文件，那么`<HashRouter>`将会是一个好选择。

对于我们的项目，将设将会有服务器的动态支持，因此我们选择`<BrowserRouter>`作为路由器组件。

##### 3.历史(History)
每个路由器都会创建一个`history`对象并用其保持追踪当前`location[注1]`并且在有变化时对网站进行重新渲染。这个`history`对象保证了`React Router`提供的其他组件的可用性，所以其他组件必须在`router`内部渲染。一个`React Router`组件如果向父级上追溯却找不到router组件，那么这个组件将无法正常工作。

##### 4.渲染<Router>
路由器组件无法接受两个及以上的子元素。基于这种限制的存在，创建一个<App>组件来渲染应用其余部分是一个有效的方法（对于服务端渲染，将应用从router组件中分离也是重要的）。
```
import { BrowserRouter } from 'react-router-dom'
ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'))
```
##### 5.路由(Route)
`<Route>`组件是`React Router`中主要的结构单元。在任意位置只要匹配了`URL`的路径名`(pathname)`你就可以创建`<Route>`元素进行渲染。

##### 6.路径(Path)
`<Route>`接受一个数为`string`类型的`path`，该值路由匹配的路径名的类型。例如：`<Route path='/roster'/>`会匹配以`/roster[注2]`开头的路径名。在当前`path`参数与当前`location`的路径相匹配时，路由就会开始渲染React元素。若不匹配，路由不会进行任何操作[注3]。
```
<Route path='/roster'/>
// 当路径名为'/'时, path不匹配
// 当路径名为'/roster'或'/roster/2'时, path匹配
// 当你只想匹配'/roster'时，你需要使用"exact"参数
// 则路由仅匹配'/roster'而不会匹配'/roster/2'
<Route exact path='/roster'/>
```
注意：在匹配路由时，React Router只关注location的路径名。当URL如下时：
```
http://www.example.com/my-projects/one?extra=false
```
React Router去匹配的只是'/my-projects/one'这一部分。

##### 7.匹配路径
`path-to-regexp` 用来决定`route`元素的`path`参数与当前`location`是否匹配。它将路径字符串编译成正则表达式，并与当前`location`的路径名进行匹配比较。除了上面的例子外，路径字符串有更多高级的选项，详见`[path-to-regexp文档]`。当路由地址匹配成功后，会创建一个含有以下属性的*match对象*：
- url ：与当前location路径名所匹配部分
- path ：路由的地址
- isExact ：path 是否等于 pathname
- params ：从*path-to-regexp*获取的路径中取出的值都被包含在这个对象中

使用[route tester](https://pshrmn.github.io/route-tester/#/)这款工具来对路由与URL进行检验。

注意：本例中路由路径仅支持绝对路径[注4]。

##### 8.创建博客的路由
可以在路由器(router)组件中的任意位置创建多个`<Route>`，但通常我们会把它们放在同一个位置。使用`<Switch>`组件来包裹一组`<Route>`。`<Switch>`会遍历自身的子元素（即路由）并对第一个匹配当前路径的元素进行渲染。

对于本网站，我们希望匹配一下路径：

- / ： 博客首页
- /admin ：后台管理
- /404 ：无效页面

为了在应用中能匹配路径，在创建`<Route>`元素时必须带有需要匹配的`path`作为参数。
```
ReactDOM.render(

    <Router>
        <div>
            <Switch>
                <Route path='/404' component={NotFound}/>
                <Route path='/admin' component={Admin}/>              
                <Route component={Front} />
            </Switch>
        </div>
    </Router>

    , document.getElementById('root')

);

```
##### 9.<Route>是如何渲染的？
当一个路由的`path`匹配成功后，路由用来确定渲染结果的参数有三种。只需要提供其中一个即可。

- component ： 一个`React`组件。当带有`component`参数的`route`匹配成功后，`route`会返回一个新的元素，其为`component`参数所对应的`React`组件（使用`React.createElement`创建）。
- render ： 一个返回`React element`的函数[注5]。当匹配成功后调用该函数。该过程与传入`component`参数类似，并且对于行级渲染与需要向元素传入额外参数的操作会更有用。
- children ： 一个返回`React element`的函数。与上述两个参数不同，无论`route`是否匹配当前`location`，其都会被渲染。
```
<Route path='/page' component={Page} />
const extraProps = { color: 'red' }
<Route path='/page' render={(props) => (
  <Page {...props} data={extraProps}/>
)}/>
<Route path='/page' children={(props) => (
  props.match
    ? <Page {...props}/>
    : <EmptyPage {...props}/>
)}/>
```
通常`component`参数与`render`参数被更经常地使用。`children`参数偶尔会被使用，它更常用在`path`无法匹配时呈现的'空'状态。在本例中并不会有额外的状态，所以我们将使用`<Route>`的`component`参数。

通过`<Route>`渲染的元素会被传入一些参数。分别是`match`对象，当前`location`对象[注6]以及`history`对象（由router创建）[注7]。

##### 10.嵌套路由
包含在`Switch`中的都是一级页面的路由，文章列表，文章详情，以及后台管理的页面都没有包含在这里。

在`Front`组件中，我们将为四种路径进行渲染：
- `/`: 对应博客的首页，罗列所有文章
- `/:tag`: 罗列指定分类下的所有文章
- `/detail/:id`: 渲染文章详情页面
- `/404`: 无效页面
```
import React, {Component} from 'react'
import {
    Route,
    Switch
} from 'react-router-dom'
import Home from '../Home'
import Detail from '../Detail'
import NotFount from '../NotFount'
import { BackTop } from 'antd'

class Front extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const {url} = this.props.match;
        return(
            <div>
                <div >
                    <Switch>
                        <Route exact path={url} component={Home}/>
                        <Route path={`/detail/:id`} component={Detail}/>
                        <Route path={`/:tag`} component={Home}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
                <BackTop />
            </div>
        )
    }
}

export default Front;

```
##### 11.路径参数
有时路径名中存在我们需要获取的参数。例如，在文章列表页，我们要获取用户点击的`tag`，在文章详情页要获取文章的`id`。我们可以向`route`的路径字符串中添加`path`参数

如'/detail/:id'中`:id`这种写法意味着`/Detail/`后的路径名将会被获取并存在`match.params.id`中。例如，路径名'/detail/234432'会获取到一个对象：
```
{ id: '234423' } // 注获取的值是字符串类型的
```
##### 12.Link
现在，我们应用需要在各个页面间切换。如果使用锚点元素（就是）实现，在每次点击时页面将被重新加载。`React Router`提供了`<Link>`组件用来避免这种状况的发生。当你点击`<Link>`时，`URL`会更新，组件会被重新渲染，但是页面不会重新加载，举个例子：
```
import { Link } from 'react-router-dom'
const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/articles'>Articles</Link></li>
        <li><Link to='/detail'>Detail</Link></li>
      </ul>
    </nav>
  </header>
)
```

`<Link>`使用'to'参数来描述需要定位的页面。它的值即可是字符串也可是`location`对象（包含`pathname`，`search`，`hash`与`state`属性）。如果其值为字符串将会被转换为location对象。

##### 13.注释：
[1] `locations` 是一个含有描述URL不同部分属性的对象：
```
// 一个基本的location对象
{ pathname: '/', search: '', hash: '', key: 'abc123' state: {} }
```
[2] 你可以渲染无路径的<Route>，其将会匹配所有location。此法用于访问存在上下文中的变量与方法。

[3] 如果你使用children参数，即便在当前location不匹配时route也将进行渲染。

[4] 当需要支持相对路径的<Route>与<Link>时，你需要多做一些工作。相对<Link>将会比你之前看到的更为复杂。因其使用了父级的match对象而非当前URL来匹配相对路径。

[5] 这是一个本质上无状态的函数组件。内部实现，component参数与render参数的组件是用很大的区别的。使用component参数的组件会使用React.createElement来创建元素，使用render参数的组件则会调用render函数。如果我们定义一个内联函数并将其传给component参数，这将会比使用render参数慢很多。
```
<Route path='/one' component={One}/>
// React.createElement(props.component)
<Route path='/two' render={() => <Two />}/>
// props.render()
```
[6]` <Route>`与`<Switch>`组件都会带有`location`参数。这能让你使用与实际`location`不同的`location`去匹配地址。

[7] 可以传入`staticContext`参数，不过这仅在服务端渲染时有用。


#### 文章列表
基本的路由我们已经创建好了，再一次回归一下：
我们在入口`index.js`文件中创建了一个`container Front`, 之后这里还会添加后台管理页面的路径，现在先空着：
```
    <Router>
        <div>
            <Switch>
                <Route component={Front} />
            </Switch>
        </div>
    </Router>
```
在`Front`中我们嵌套了4个路由，分别对应首页，指定分类文章列表，文章详情，以及无效页面：
```
     <Switch>
          <Route exact path={url} component={Home}/>
          <Route path={`/detail/:id`} component={Detail}/>
          <Route path={`/:tag`} component={Home}/>
          <Route component={NotFound}/>
     </Switch>
```
文章列表页的主要交互就是：根据用户在`Menus`中点击的分类，改变当前的路径，根据路径中的参数渲染当前页面。

`Home`这个`container`包含三个部分：
- Header
- Menus
- ArticleList
```
import React, { Component } from 'react';
import './style.css';
import Header from '../../components/Header';
import Menus from '../../components/Menus';
import ArticleList from '../../components/ArticleList'
import { Redirect } from 'react-router-dom';


class Home extends Component {

    render() {
        const { tags } = this.props;
        return (
            <div className="h_container">
                <Header />
                <div className="nav">
                    <Menus history={this.props.history} />
                </div>
                <div className="main">
                    <ArticleList history={this.props.history} tags={tags} />
                </div>
            </div>
        )
    }
};

export default Home;
```
这里`ArticleList`主要渲染当前分类下的文章列表：
```
import React, { Component } from 'react'
import ArticleListCell from '../ArticleListCell'

const items = [{
    key: '123',
    title: '标题',
    time: '2017-10-29',
    viewCount: '100',
    commentCount: '23'
},{
    key: '123332',
    title: '标题2',
    time: '2017-10-29 12:00:00',
    viewCount: '10',
    commentCount: '123'
}];

export default class ArticleList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { tags } = this.props;
        return(
            <div>
                {
                    items.map((item,index) => (
                        <ArticleListCell history={this.props.history} key={index} data={item} tags={tags} />
                    ))
                }
            </div>
        )

    }
}
```
先定义一个数组`items`作文假数据，通过`map`方法，返回相应的文章内容，这里我们新建了一个组件`ArticleListCell`:

```
import React, { Component } from 'react'
import './style.css'
import { Link } from 'react-router-dom'


export default class ArticleListCell extends Component {

    render() {
        return(
            <div className="ac_container" onClick={
                () => {
                    this.props.history.push(`/detail/${this.props.data._id}`, {id: this.props.data_id});
                    // props.getArticleDetail(props.data_id)
                }
              }
            >
                <div className="content">
                    <div className="title">
                        <h2>{this.props.data.title} + {this.props.tags}</h2>
                    </div>
                    <p className="summary">
                        这里应该有摘要的，因为设计的数据库表表结构的时候忘记了，后面也是懒得加了，感觉太麻烦了，就算了
                    </p>
                    <div>
                        <p className="info">
                            <div className="tag">
                                <img src={require('./calendar.png')} alt="发表日期"/>
                                <div>{this.props.data.time}</div>
                            </div>
                            <div className="tag">
                                <img src={require('./views.png')} alt="阅读数"/>
                                <div>{this.props.data.viewCount}</div>
                            </div>
                            <div className="tag">
                                <img src={require('./comments.png')} alt="评论数"/>
                                <div>{this.props.data.commentCount}</div>
                            </div>
                        </p>
                        <span className="lastSpan">
                            阅读全文
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}
```
这个组件一方面展示文章标题和其他信息，还有一个功能是点击时跳转到文章详情，从代码中可以看到，我给该部分加了一个`onClick `方法，其内容是：
```
this.props.history.push(`/detail/${this.props.data._id}`, {id: this.props.data_id});
```
这里执行了一个`react-route`提供的方法`history.push`，实现页面的转换，并将文章`id`通过路由传递到文章详情页。当然，这里也可以使用`Link`组件实现跳转。

让我们来看一下，当前页面的样子：

![屏幕快照 2017-10-27 下午5.20.33.png](http://upload-images.jianshu.io/upload_images/1224641-966870600fc1fa48.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 文章详情
文章详情页面主要包含标题，以及文章内容。内容部分要支持`Markdown`。

首先安装一下`remark`和`remark-react`两个模块，用户渲染`Markdown`内容
```
npm install --save remakr
npm install --save remark-react
```
来看一下`Detail`这个页面的具体内容：

```
import React, { Component } from 'react'
import remark from 'remark'
import reactRenderer from 'remark-react'
import '../Home/style.css'
import '../../components/Header/style.css'
import './style.css'

const articleContent = "## 标题 \n```code``` \n jlkfdsjal"

class Detail extends Component {
    render() {
        return(
            <div className="h_container">
                <div className="header">
                    <h1>文章标题在这里</h1>
                </div>
                <div className="main">
                    <div id='preview' className="main">
                        <div className="markdown_body">
                            {remark().use(reactRenderer).processSync(articleContent).contents}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Detail;
```
`articleContent`是我们文章的内容，`mardown_body`是我预先下载的`github`主题的marksown css文件，当然你也可以下载其他的主题。
```
<div id='preview' className="main">
    <div className="markdown_body">
        {remark().use(reactRenderer).processSync(articleContent).contents}
    </div>
</div>
```
完成这部分内容后，将`Detail`引入到`Front`页面里：
```
class Front extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const {url} = this.props.match;
        return(
            <div>
                <div >
                    <Switch>
                        <Route exact path={url} component={Home}/>
                        <Route path={`/detail/:id`} component={Detail}/>
                        <Route path={`/:tag`} component={Home}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
                <BackTop />
            </div>
        )
    }
}
```
这是，你在点击文章列表中的`ArticleListCell`，就可以看到文章详情了：

![屏幕快照 2017-10-27 下午5.29.19.png](http://upload-images.jianshu.io/upload_images/1224641-c685633ab5095ed5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 总结
到此为止，我们的博客展示页面就算完成了，使用到的技术有：
- react
- react-router

本篇文章的源码在这里：[React技术栈+Express+Mongodb实现个人博客 -- Part 1](https://github.com/sam408130/react-blog/tree/part1)

下一篇文章主要内容是使用Ant Design创建后台管理页面：
- 标签管理(添加和删除)
- 新建文章
- 文章管理(修改，删除)

![articles.gif](http://upload-images.jianshu.io/upload_images/1224641-d1301856880e0bd4.gif?imageMogr2/auto-orient/strip)

#### 系列文章
[React技术栈+Express+Mongodb实现个人博客](http://www.jianshu.com/p/e8d68f9e29c6)
[React技术栈+Express+Mongodb实现个人博客 -- Part 1 博客页面展示](http://www.jianshu.com/p/3ed54d305d8e)
React技术栈+Express+Mongodb实现个人博客 -- Part 2 后台管理页面
React技术栈+Express+Mongodb实现个人博客 -- Part 3 Express + Mongodb创建Server端
React技术栈+Express+Mongodb实现个人博客 -- Part 4 使用Webpack
React技术栈+Express+Mongodb实现个人博客 -- Part 5 使用Redux
React技术栈+Express+Mongodb实现个人博客 -- Part 6 项目部署
