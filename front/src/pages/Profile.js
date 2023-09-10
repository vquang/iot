import {avatar} from '../assets/images'

const Profile = () => {
    return (
        <div className="profile-page">
            <div className="profile-item one">
                <div class="avatar">
                    <img class="avatar-img" src={avatar} alt="avatar" />
                </div>
            </div>
            <div className="profile-item two">
                <div class="profile-top">Thông tin cá nhân</div>
                <div class="profile-detail">
                    <span class="profile-label">Họ và tên:</span>
                    <span>Nguyễn Vinh Quang</span>
                </div>
                <div class="profile-detail">
                    <span class="profile-label">Giới tính:</span>
                    <span>Nam</span>
                </div>
                <div class="profile-detail">
                    <span class="profile-label">Ngày sinh:</span>
                    <span>09/05/2002</span>
                </div>
                <div class="profile-detail">
                    <span class="profile-label">Email:</span>
                    <span>nguyenvinhquang19a1@gmail.com</span>
                </div>
                <div class="profile-detail">
                    <span class="profile-label">Địa chỉ:</span>
                    <span>28 Trần Hữu Dực, Quận Nam Từ Liêm, Hà Nội</span>
                </div>
            </div>
            <div className="profile-item three">
                <div class="profile-top">Kỹ năng</div>
                <div class="profile-detail">
                    <span class="profile-label">Back-end:</span>
                    <span>Spring boot, Spring security (Jwt), Jooq</span>
                </div>
                <div class="profile-detail">
                    <span class="profile-label">Front-end:</span>
                    <span>Html, Css, Javascript, ReactJs</span>
                </div>
                <div class="profile-detail">
                    <span class="profile-label">Database:</span>
                    <span>Mysql, Postgresql, Mongodb</span>
                </div>
            </div>
            <div className="profile-item four">
                <div class="profile-top">Thông tin ngành học</div>
                <div class="profile-detail">
                    <span class="profile-label">Trường học:</span>
                    <span>Học viện Công nghệ Bưu chính Viễn thông</span>
                </div>
                <div class="profile-detail">
                    <span class="profile-label">Mã sinh viên:</span>
                    <span>B20DCAT145</span>
                </div>
                <div class="profile-detail">
                    <span class="profile-label">Lớp:</span>
                    <span>D20CQAT01-B</span>
                </div>
                <div class="profile-detail">
                    <span class="profile-label">Ngành:</span>
                    <span>An toàn thông tin</span>
                </div>
                <div class="profile-detail">
                    <span class="profile-label">Khoa:</span>
                    <span>Công nghệ thông tin</span>
                </div>
                <div class="profile-detail">
                    <span class="profile-label">Niên khóa:</span>
                    <span>2020-2025</span>
                </div>
                <div class="profile-detail">
                    <span class="profile-label">Email:</span>
                    <span>QuangNV.B20AT145@stu.ptit.edu.vn</span>
                </div>
            </div>
        </div>
    )
}

export default Profile