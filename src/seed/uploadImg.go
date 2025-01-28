package main

import (
	"context"
	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
)

func uploadImage(cld *cloudinary.Cloudinary, ctx context.Context, url string) (string, error) {
	resp, err := cld.Upload.Upload(ctx, url, uploader.UploadParams{})
	if err != nil {
		return "", err
	}
	return resp.SecureURL, nil
}
