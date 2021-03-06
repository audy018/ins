<ul class="breadcrumb">
    <li><a href="<?php echo site_url(); ?>">หน้าหลัก</a></li>
    <li class="active">ข้อมูลผู้ใช้งาน</li>
</ul>

<div class="tabbable">
    <ul class="nav nav-pills">
        <li class="active"><a href="#tab1" id="tab_main" data-toggle="tab"><i class="icon-th-list"></i> ผู้ใช้งาน</a></li>
    </ul>
    <div class="tab-content">
        <div class="tab-pane active" id="tab1">
            <br>
            <blockquote>
                <p>จัดการข้อมูล ผู้ใช้งาน ทั้งหมดที่มีในฐานข้อมูล</p>
            </blockquote>
            <table class="table table-striped" id="tbl_list" style="width: 780px">
                <thead>
                <tr>
                    <th>รหัส</th>
                    <th>ชื่อผู้ใช้งาน</th>
                    <th>ชื่อ - สกุล</th>
                    <th>ประเภท</th>
                    <th>สถานะ</th>
                    <th>#</th>
                </tr>
                </thead>
                <tbody></tbody>
            </table>

            <a href="javascript:void(0);" class="btn btn-success" id="btn_new"><i class="icon-plus-sign "></i> เพิ่มผู้ใช้งาน</a>
            <a href="javascript:void(0);" class="btn" id="btn_print"><i class="icon-download-alt"></i> พิมพ์รายการ (PDF)</a>

        </div>
    </div>
</div>

<div class="modal fade" id="mdl_new">
    <div class="modal-dialog" style="width: 680px;">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title"><i class="icon-file-alt"></i> เพิ่มรายการ</h4>
            </div>
            <div class="modal-body">
                <form action="#" class="form-horizontal">
                    <input type="hidden" id="txt_id">
                    <input type="hidden" id="txt_old_fullname">
                    <div class="control-group">
                        <label class="control-label" for="txt_fullname">ชื่อ - สกุล</label>
                        <div class="controls">
                            <input type="text" id="txt_fullname" class="input-xlarge" placeholder="...">
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="txt_username">ชื่อผู้ใช้งาน</label>
                        <div class="controls">
                            <input type="text" id="txt_username" class="input-xlarge" placeholder="...">
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="txt_password">รหัสผ่าน</label>
                        <div class="controls">
                            <input type="password" id="txt_password" class="input-xlarge" placeholder="...">
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="sl_user_type">ประเภทผู้ใช้งาน</label>
                        <div class="controls">
                            <select name="sl_user_type" id="sl_user_type">
                                <?php
                                foreach($user_types as $u)
                                    echo '<option value="'.$u->type_code.'">' . $u->type_name . '</option>';
                                ?>
                            </select>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="sl_owner">สถานะ</label>
                        <div class="controls">
                            <label class="checkbox">
                                <input type="checkbox" checked="checked" id="chk_active"> ปกติ
                            </label>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <a href="#" class="btn btn-success" id="btn_save"><i class="icon-plus-sign icon-white"></i> บันทึกรายการ</a>
                <a href="#" class="btn btn-danger" data-dismiss="modal"><i class="icon-off icon-white"></i> ปิดหน้าต่าง</a>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="mdl_change_password">
    <div class="modal-dialog" style="width: 680px;">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title"><i class="icon-key"></i> เปลี่ยนรหัสผ่าน</h4>
            </div>
            <div class="modal-body">
                <form action="#" class="form-horizontal">
                    <input type="hidden" id="txt_change_id">
                    <div class="control-group">
                        <label class="control-label" for="txt_change_username">ชื่อผู้ใช้งาน</label>
                        <div class="controls">
                            <input type="text" disabled id="txt_change_username" class="input-xlarge uneditable-input" placeholder="...">
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="txt_new_password">รหัสผ่านใหม่</label>
                        <div class="controls">
                            <input type="password" id="txt_new_password" class="input-xlarge" placeholder="...">
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="txt_confirm_new_password">รหัสผ่านใหม่ (อีกครั้ง)</label>
                        <div class="controls">
                            <input type="password" id="txt_confirm_new_password" class="input-xlarge" placeholder="...">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <a href="#" class="btn btn-success" id="btn_do_change_password"><i class="icon-plus-sign icon-white"></i> เปลี่ยนรหัสผ่าน</a>
                <a href="#" class="btn btn-danger" data-dismiss="modal"><i class="icon-off icon-white"></i> ปิดหน้าต่าง</a>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/apps/admins.js"></script>
