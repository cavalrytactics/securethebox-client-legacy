from github_model import GitHub
from fuse_model import FuseReact

if __name__ == "__main__":
    fuse = FuseReact()
    git = GitHub()
    fuse.get_current_fuse_version()
    fuse.get_latest_fuse_version()
    if fuse.current_fuse_version != fuse.latest_fuse_version:
        fuse.update_current_fuse_version_package_json(fuse.latest_fuse_version)
        print("Updated from",fuse.current_fuse_version,"to",fuse.latest_fuse_version)
    else:
        print("Project is already using",fuse.current_fuse_version)