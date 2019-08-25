import API from './api';
import Post from './Post';
import _ from 'lodash';
import { create } from 'domain';

export default class ViewController {
  constructor() {
    this.postCollection = [];
    this.history = [];

    const postTemplate = document.getElementById('blog-post-template');
    this.template = _.template(postTemplate.textContent.trim());
    this.initialize();
  }

  initialize() {
    this.establishHandlers();
    this.fetchPosts();
    const elements = this.generatePostDOMElements(this.postCollection);
    this.renderPosts(elements);
  }

  establishHandlers() {
    document.getElementsByClassName('blog-body__form-section__form__submit')[0]
    .addEventListener('click', e => {
      e.preventDefault();
      const title = document.getElementsByClassName('blog-body__form-section__form__title')[0].value;
      const body = document.getElementsByClassName('blog-body__form-section__form__body')[0].value;
      this.handleSubmit({
        title,
        body
      });
    })
    const undoButton = document.getElementsByClassName('blog-post-undo')[0];
    undoButton.addEventListener('click', e=>{
      e.preventDefault();
      this.undoAction();
    })
  }

  fetchPosts() {
    const response = API.get();
    if (response.status === 200) {
      this.postCollection = response.body
        .map(post => new Post(JSON.parse(post)))
        .reverse();
    }
  }

  generatePostDOMElements(posts) {
    return posts.map(post => {
      const html = this.template(post.attributes);
      const wrapperDiv = document.createElement('div');
      wrapperDiv.innerHTML = html;
      
      const deleteButton = wrapperDiv.getElementsByClassName('blog-post-delete')[0];
      deleteButton.addEventListener('click', e => {
        e.preventDefault();
        this.deletePost(deleteButton.getAttribute("data-id"));
      });
      return wrapperDiv.firstChild;
    });
  }

  renderPosts(postDOMElements) {
    const bodyContent = document.getElementsByClassName('blog-body__content')[0];
    postDOMElements.forEach(element => {
      bodyContent.appendChild(element);
    });
  }

  renderPost(postDOMElement) {
    const parent = document.getElementsByClassName('blog-body__content')[0];
    parent.insertBefore(postDOMElement, parent.firstChild);
  }

  handleSubmit(data) {
    this.addPost(data);
  };

  addPost(data) {
    const postModel = new Post(data);
    this.createPost(postModel);
    this.history.push({action:"create", object:postModel});
  }

  createPost(postModel) {
    const response = postModel.save();
    if (response.status === 200) {
      this.postCollection.push(postModel);
    }
    const elements = this.generatePostDOMElements([postModel]);
    this.renderPost(elements[0]);
  }

  deletePost(id) {
    let object = this.postCollection.find(object => object.attributes.id == id);
    this.history.push({action:"delete", object});
    this.removePost(object);
    
  }

  removePost(object) {
    object.delete();
    const parent = document.getElementsByClassName('blog-body__content')[0];
    parent.innerHTML = "";
    this.postCollection = this.postCollection.filter(obj => obj.attributes.id != object.attributes.id);
    const elements = this.generatePostDOMElements(this.postCollection);
    this.renderPosts(elements);
  }

  undoAction(){
    var temp = this.history.pop();
    if(temp)
    switch(temp.action) {
      case "create":
        this.removePost(temp.object);
        break;
      case "delete":
          const postModel = new Post(temp.object.attributes);
          this.createPost(postModel);
        break;
    }
  }
  
}
