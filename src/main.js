function Chat() {
    this.userName;
    this.userImg;
    this.id;
    this.userList = [];
    this.chatGroupList = [];
    this.sendFriend = '';
    this.sendChatGroup = '';
    this.messageJson = {};
    this.msgGroupJson = {};
    this.tag = 0;
}

Chat.prototype = {
    init() {
        this.userName = localStorage.getItem('userName');
        this.userImg = localStorage.getItem('userImg');
        this.selectClick();
        this.setAllPorarait();

        if (this.userName && this.userImg) {
            $("#login-wrap").style.display = 'none';
            this.login(this.userName, this.userImg);
        } else {
            $('.chat-btn').onclick = () => {
                let userName = $('.user-name').value;
                let userImg = $('.my-por').getAttribute('src');
                this.login(userName, userImg);
            }
        }
    },

    login(userName, userImg) {
        if (userName && userImg) {
            this.initSocket(userName, userImg);
        }
    },

    initSocket(userName, userImg) {
        window.socket = io();

        window.socket.on('connect', () => {
            $("#login-wrap").style.display = 'none';
            $('.chat-panel').style.display = 'block';
            
            this.userName = userName;
            this.userImg = userImg;
            this.id = window.socket.id;
            
            let userInfo = {
                id: window.socket.id,
                userName: userName,
                userImg: userImg
            }
            
            localStorage.setItem('userName', userName);
            localStorage.setItem('userImg', userImg);
            
            window.socket.emit('login', userInfo);
        })

        window.socket.on('userList', (userList) => {
            this.userList = userList;
            this.drawUserList();
        })

        window.socket.on('quit', (id) => {
            this.userList = this.userList.filter(item => item.id != id)
            this.drawUserList();
        })
    }
}