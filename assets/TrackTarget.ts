const {ccclass, property} = cc._decorator;

@ccclass
export default class TrackTarget extends cc.Component {

    @property(cc.Node)
    target: cc.Node = null;

    @property(cc.Camera)
    camera: cc.Camera = null;

    @property(cc.Camera)
    camera2d: cc.Camera = null;

    private _canvas: cc.Node;

    start () {
        this._canvas = cc.find("Canvas");
    }

    update (dt) {
        var outM4 = new cc.Mat4();
        this.target.parent.getWorldMatrix(outM4);

        var wpos = new cc.Vec3();
        this.target.position.transformMat4(outM4, wpos);

        const spos: cc.Vec3 = this.camera.getWorldToScreenPoint(wpos);
        const pos2d: cc.Vec3 = this.camera2d.getScreenToWorldPoint(spos)

        this.node.parent.getWorldMatrix(outM4);

        var invertM4 = new cc.Mat4();
        outM4.invert(invertM4);

        pos2d.transformMat4(invertM4, wpos);
        this.node.setPosition(wpos.x, wpos.y);
    }
}
